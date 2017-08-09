/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeFiberInspector
 * @flow
 */
'use strict';

const ReactNativeComponentTree = require('ReactNativeComponentTree');
const ReactFiberTreeReflection = require('ReactFiberTreeReflection');
const getComponentName = require('getComponentName');
const emptyObject = require('fbjs/lib/emptyObject');
const ReactTypeOfWork = require('ReactTypeOfWork');
const UIManager = require('UIManager');
const invariant = require('fbjs/lib/invariant');

const { getClosestInstanceFromNode } = ReactNativeComponentTree;
const { findCurrentFiberUsingSlowPath } = ReactFiberTreeReflection;
const { HostComponent } = ReactTypeOfWork;

import type { Fiber } from 'ReactFiber';

let getInspectorDataForViewTag = () => {
  invariant(false, 'getInspectorDataForViewTag() is not available in production');
};

var traverseOwnerTreeUp, getOwnerHierarchy, lastNonHostInstance, getHostProps, getHostNode, createHierarchy;


module.exports = {
  getInspectorDataForViewTag
};