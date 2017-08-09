/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactFiberClassComponent
 * @flow
 */

'use strict';

import type { Fiber } from 'ReactFiber';
import type { PriorityLevel } from 'ReactPriorityLevel';

var { Update } = require('ReactTypeOfSideEffect');

var ReactFeatureFlags = require('ReactFeatureFlags');
var { AsyncUpdates } = require('ReactTypeOfInternalContext');

var {
  cacheContext,
  getMaskedContext,
  getUnmaskedContext,
  isContextConsumer
} = require('ReactFiberContext');
var {
  addUpdate,
  addReplaceUpdate,
  addForceUpdate,
  beginUpdateQueue
} = require('ReactFiberUpdateQueue');
var { hasContextChanged } = require('ReactFiberContext');
var { isMounted } = require('ReactFiberTreeReflection');
var ReactInstanceMap = require('ReactInstanceMap');
var emptyObject = require('fbjs/lib/emptyObject');
var getComponentName = require('getComponentName');
var shallowEqual = require('fbjs/lib/shallowEqual');
var invariant = require('fbjs/lib/invariant');

const isArray = Array.isArray;

var { startPhaseTimer, stopPhaseTimer }, warning, warnOnInvalidCallback;


module.exports = function (scheduleUpdate: (fiber: Fiber, priorityLevel: PriorityLevel) => void, getPriorityContext: (fiber: Fiber, forceAsync: boolean) => PriorityLevel, memoizeProps: (workInProgress: Fiber, props: any) => void, memoizeState: (workInProgress: Fiber, state: any) => void) {
  // Class component state updater
  const updater = {
    isMounted,
    enqueueSetState(instance, partialState, callback) {
      const fiber = ReactInstanceMap.get(instance);
      const priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;

      addUpdate(fiber, partialState, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueReplaceState(instance, state, callback) {
      const fiber = ReactInstanceMap.get(instance);
      const priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;

      addReplaceUpdate(fiber, state, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    },
    enqueueForceUpdate(instance, callback) {
      const fiber = ReactInstanceMap.get(instance);
      const priorityLevel = getPriorityContext(fiber, false);
      callback = callback === undefined ? null : callback;

      addForceUpdate(fiber, callback, priorityLevel);
      scheduleUpdate(fiber, priorityLevel);
    }
  };

  function checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      // If the workInProgress already has an Update effect, return true
      return true;
    }

    const instance = workInProgress.stateNode;
    const type = workInProgress.type;
    if (typeof instance.shouldComponentUpdate === 'function') {
      const shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);


      return shouldUpdate;
    }

    if (type.prototype && type.prototype.isPureReactComponent) {
      return !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState);
    }

    return true;
  }

  function resetInputPointers(workInProgress: Fiber, instance: any) {
    instance.props = workInProgress.memoizedProps;
    instance.state = workInProgress.memoizedState;
  }

  function adoptClassInstance(workInProgress: Fiber, instance: any): void {
    instance.updater = updater;
    workInProgress.stateNode = instance;
    // The instance needs access to the fiber so that it can schedule updates
    ReactInstanceMap.set(instance, workInProgress);
  }

  function callComponentWillMount(workInProgress, instance) {
    const oldState = instance.state;
    instance.componentWillMount();


    if (oldState !== instance.state) {
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  function callComponentWillReceiveProps(workInProgress, instance, newProps, newContext) {
    const oldState = instance.state;
    instance.componentWillReceiveProps(newProps, newContext);


    if (instance.state !== oldState) {
      updater.enqueueReplaceState(instance, instance.state, null);
    }
  }

  // Invokes the mount life-cycles on a previously never rendered instance.


  // Called on a preexisting class instance. Returns false if a resumed render
  // could be reused.
  // function resumeMountClassInstance(
  //   workInProgress: Fiber,
  //   priorityLevel: PriorityLevel,
  // ): boolean {
  //   const instance = workInProgress.stateNode;
  //   resetInputPointers(workInProgress, instance);

  //   let newState = workInProgress.memoizedState;
  //   let newProps = workInProgress.pendingProps;
  //   if (!newProps) {
  //     // If there isn't any new props, then we'll reuse the memoized props.
  //     // This could be from already completed work.
  //     newProps = workInProgress.memoizedProps;
  //     invariant(
  //       newProps != null,
  //       'There should always be pending or memoized props. This error is ' +
  //         'likely caused by a bug in React. Please file an issue.',
  //     );
  //   }
  //   const newUnmaskedContext = getUnmaskedContext(workInProgress);
  //   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

  //   const oldContext = instance.context;
  //   const oldProps = workInProgress.memoizedProps;

  //   if (
  //     typeof instance.componentWillReceiveProps === 'function' &&
  //     (oldProps !== newProps || oldContext !== newContext)
  //   ) {
  //     callComponentWillReceiveProps(
  //       workInProgress,
  //       instance,
  //       newProps,
  //       newContext,
  //     );
  //   }

  //   // Process the update queue before calling shouldComponentUpdate
  //   const updateQueue = workInProgress.updateQueue;
  //   if (updateQueue !== null) {
  //     newState = beginUpdateQueue(
  //       workInProgress,
  //       updateQueue,
  //       instance,
  //       newState,
  //       newProps,
  //       priorityLevel,
  //     );
  //   }

  //   // TODO: Should we deal with a setState that happened after the last
  //   // componentWillMount and before this componentWillMount? Probably
  //   // unsupported anyway.

  //   if (
  //     !checkShouldComponentUpdate(
  //       workInProgress,
  //       workInProgress.memoizedProps,
  //       newProps,
  //       workInProgress.memoizedState,
  //       newState,
  //       newContext,
  //     )
  //   ) {
  //     // Update the existing instance's state, props, and context pointers even
  //     // though we're bailing out.
  //     instance.props = newProps;
  //     instance.state = newState;
  //     instance.context = newContext;
  //     return false;
  //   }

  //   // Update the input pointers now so that they are correct when we call
  //   // componentWillMount
  //   instance.props = newProps;
  //   instance.state = newState;
  //   instance.context = newContext;

  //   if (typeof instance.componentWillMount === 'function') {
  //     callComponentWillMount(workInProgress, instance);
  //     // componentWillMount may have called setState. Process the update queue.
  //     const newUpdateQueue = workInProgress.updateQueue;
  //     if (newUpdateQueue !== null) {
  //       newState = beginUpdateQueue(
  //         workInProgress,
  //         newUpdateQueue,
  //         instance,
  //         newState,
  //         newProps,
  //         priorityLevel,
  //       );
  //     }
  //   }

  //   if (typeof instance.componentDidMount === 'function') {
  //     workInProgress.effectTag |= Update;
  //   }

  //   instance.state = newState;

  //   return true;
  // }

  // Invokes the update life-cycles and returns false if it shouldn't rerender.


  return {
    adoptClassInstance,
    constructClassInstance: function (workInProgress: Fiber, props: any): any {
      const ctor = workInProgress.type;
      const unmaskedContext = getUnmaskedContext(workInProgress);
      const needsContext = isContextConsumer(workInProgress);
      const context = needsContext ? getMaskedContext(workInProgress, unmaskedContext) : emptyObject;
      const instance = new ctor(props, context);
      adoptClassInstance(workInProgress, instance);

      // Cache unmasked context so we can avoid recreating masked context unless necessary.
      // ReactFiberContext usually updates this cache but can't for newly-created instances.
      if (needsContext) {
        cacheContext(workInProgress, unmaskedContext, context);
      }

      return instance;
    },
    mountClassInstance: function (workInProgress: Fiber, priorityLevel: PriorityLevel): void {
      const current = workInProgress.alternate;

      const instance = workInProgress.stateNode;
      const state = instance.state || null;

      let props = workInProgress.pendingProps;
      invariant(props, 'There must be pending props for an initial mount. This error is ' + 'likely caused by a bug in React. Please file an issue.');

      const unmaskedContext = getUnmaskedContext(workInProgress);

      instance.props = props;
      instance.state = state;
      instance.refs = emptyObject;
      instance.context = getMaskedContext(workInProgress, unmaskedContext);

      if (ReactFeatureFlags.enableAsyncSubtreeAPI && workInProgress.type != null && workInProgress.type.prototype != null && workInProgress.type.prototype.unstable_isAsyncReactComponent === true) {
        workInProgress.internalContextTag |= AsyncUpdates;
      }

      if (typeof instance.componentWillMount === 'function') {
        callComponentWillMount(workInProgress, instance);
        // If we had additional state updates during this life-cycle, let's
        // process them now.
        const updateQueue = workInProgress.updateQueue;
        if (updateQueue !== null) {
          instance.state = beginUpdateQueue(current, workInProgress, updateQueue, instance, state, props, priorityLevel);
        }
      }
      if (typeof instance.componentDidMount === 'function') {
        workInProgress.effectTag |= Update;
      }
    },
    // resumeMountClassInstance,
    updateClassInstance: function (current: Fiber, workInProgress: Fiber, priorityLevel: PriorityLevel): boolean {
      const instance = workInProgress.stateNode;
      resetInputPointers(workInProgress, instance);

      const oldProps = workInProgress.memoizedProps;
      let newProps = workInProgress.pendingProps;
      if (!newProps) {
        // If there aren't any new props, then we'll reuse the memoized props.
        // This could be from already completed work.
        newProps = oldProps;
        invariant(newProps != null, 'There should always be pending or memoized props. This error is ' + 'likely caused by a bug in React. Please file an issue.');
      }
      const oldContext = instance.context;
      const newUnmaskedContext = getUnmaskedContext(workInProgress);
      const newContext = getMaskedContext(workInProgress, newUnmaskedContext);

      // Note: During these life-cycles, instance.props/instance.state are what
      // ever the previously attempted to render - not the "current". However,
      // during componentDidUpdate we pass the "current" props.

      if (typeof instance.componentWillReceiveProps === 'function' && (oldProps !== newProps || oldContext !== newContext)) {
        callComponentWillReceiveProps(workInProgress, instance, newProps, newContext);
      }

      // Compute the next state using the memoized state and the update queue.
      const oldState = workInProgress.memoizedState;
      // TODO: Previous state can be null.
      let newState;
      if (workInProgress.updateQueue !== null) {
        newState = beginUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, oldState, newProps, priorityLevel);
      } else {
        newState = oldState;
      }

      if (oldProps === newProps && oldState === newState && !hasContextChanged() && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }
        return false;
      }

      const shouldUpdate = checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext);

      if (shouldUpdate) {
        if (typeof instance.componentWillUpdate === 'function') {
          instance.componentWillUpdate(newProps, newState, newContext);
        }
        if (typeof instance.componentDidUpdate === 'function') {
          workInProgress.effectTag |= Update;
        }
      } else {
        // If an update was already in progress, we should schedule an Update
        // effect even though we're bailing out, so that cWU/cDU are called.
        if (typeof instance.componentDidUpdate === 'function') {
          if (oldProps !== current.memoizedProps || oldState !== current.memoizedState) {
            workInProgress.effectTag |= Update;
          }
        }

        // If shouldComponentUpdate returned false, we should still update the
        // memoized props/state to indicate that this work can be reused.
        memoizeProps(workInProgress, newProps);
        memoizeState(workInProgress, newState);
      }

      // Update the existing instance's state, props, and context pointers even
      // if shouldComponentUpdate returns false.
      instance.props = newProps;
      instance.state = newState;
      instance.context = newContext;

      return shouldUpdate;
    }
  };
};