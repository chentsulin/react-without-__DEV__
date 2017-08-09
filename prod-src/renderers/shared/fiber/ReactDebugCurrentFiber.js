/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugCurrentFiber
 * @flow
 */

'use strict';

import type { Fiber } from 'ReactFiber';

type LifeCyclePhase = 'render' | 'getChildContext';

var { ReactDebugCurrentFrame } = require('ReactGlobalSharedState');

var getComponentName, {
  getStackAddendumByWorkInProgressFiber
};


function getCurrentFiberOwnerName(): string | null {
  return null;
}

function getCurrentFiberStackAddendum(): string | null {
  return null;
}

function resetCurrentFiber() {
  ReactDebugCurrentFrame.getCurrentStack = null;
  ReactDebugCurrentFiber.current = null;
  ReactDebugCurrentFiber.phase = null;
}

function setCurrentFiber(fiber: Fiber | null, phase: LifeCyclePhase | null) {
  ReactDebugCurrentFrame.getCurrentStack = getCurrentFiberStackAddendum;
  ReactDebugCurrentFiber.current = fiber;
  ReactDebugCurrentFiber.phase = phase;
}

var ReactDebugCurrentFiber = {
  current: (null: Fiber | null),
  phase: (null: LifeCyclePhase | null),
  resetCurrentFiber,
  setCurrentFiber,
  getCurrentFiberOwnerName,
  getCurrentFiberStackAddendum
};

module.exports = ReactDebugCurrentFiber;