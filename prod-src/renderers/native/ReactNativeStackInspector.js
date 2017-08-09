/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeStackInspector
 * @flow
 */
'use strict';

const ReactNativeComponentTree = require('ReactNativeComponentTree');
const getComponentName = require('getComponentName');
const emptyObject = require('fbjs/lib/emptyObject');
const UIManager = require('UIManager');
const invariant = require('fbjs/lib/invariant');

let getInspectorDataForViewTag = () => {
  invariant(false, 'getInspectorDataForViewTag() is not available in production');
};

var traverseOwnerTreeUp, getOwnerHierarchy, lastNotNativeInstance, getHostProps, createHierarchy;


module.exports = {
  getInspectorDataForViewTag
};