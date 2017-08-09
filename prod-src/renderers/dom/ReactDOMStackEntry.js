/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMStackEntry
 */

/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/

'use strict';

var ReactDOMComponentTree = require('ReactDOMComponentTree');
var ReactGenericBatching = require('ReactGenericBatching');
var ReactMount = require('ReactMount');
var ReactUpdates = require('ReactUpdates');
var ReactReconciler = require('ReactReconciler');
var ReactVersion = require('ReactVersion');

var findDOMNode = require('findDOMNode');
var getHostComponentFromComposite = require('getHostComponentFromComposite');

var warning;


require('ReactDOMInjection');
require('ReactDOMClientInjection');
require('ReactDOMStackInjection');

var ReactDOMStack = {
  findDOMNode: findDOMNode,
  render: ReactMount.render,
  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
  version: ReactVersion,

  /* eslint-disable camelcase */
  unstable_batchedUpdates: ReactGenericBatching.batchedUpdates,
  unstable_renderSubtreeIntoContainer: ReactMount.renderSubtreeIntoContainer,
  /* eslint-enable camelcase */

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    // For TapEventPlugin which is popular in open source
    EventPluginHub: require('EventPluginHub'),
    // Used by test-utils
    EventPluginRegistry: require('EventPluginRegistry'),
    EventPropagators: require('EventPropagators'),
    ReactControlledComponent: require('ReactControlledComponent'),
    ReactDOMComponentTree,
    ReactDOMEventListener: require('ReactDOMEventListener'),
    ReactUpdates: ReactUpdates
  }
};

// Inject the runtime into a devtools global hook regardless of browser.
// Allows for debugging when the hook is injected on the page.
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
    ComponentTree: {
      getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
      getNodeFromInstance: function (inst) {
        // inst is an internal instance (but could be a composite)
        if (inst._renderedComponent) {
          inst = getHostComponentFromComposite(inst);
        }
        if (inst) {
          return ReactDOMComponentTree.getNodeFromInstance(inst);
        } else {
          return null;
        }
      }
    },
    Mount: ReactMount,
    Reconciler: ReactReconciler
  });
}

var ExecutionEnvironment, showFileUrlMessage, testFunc, ieCompatibilityMode, expectedFeatures, i;
var ReactInstrumentation, ReactDOMUnknownPropertyHook, ReactDOMNullInputValuePropHook, ReactDOMInvalidARIAHook;


module.exports = ReactDOMStack;