/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeFiberHostComponent
 * @flow
 * @preventMunge
 */

'use strict';

var ReactNativeAttributePayload = require('ReactNativeAttributePayload');
var TextInputState = require('TextInputState');
var UIManager = require('UIManager');

var { mountSafeCallback, warnForStyleProps } = require('NativeMethodsMixinUtils');

import type { MeasureInWindowOnSuccessCallback, MeasureLayoutOnSuccessCallback, MeasureOnSuccessCallback, NativeMethodsMixinType } from 'ReactNativeTypes';
import type { Instance } from 'ReactNativeFiberRenderer';
import type { ReactNativeBaseComponentViewConfig } from 'ReactNativeViewConfigRegistry';

/**
 * This component defines the same methods as NativeMethodsMixin but without the
 * findNodeHandle wrapper. This wrapper is unnecessary for HostComponent views
 * and would also result in a circular require.js dependency (since
 * ReactNativeFiber depends on this component and NativeMethodsMixin depends on
 * ReactNativeFiber).
 */
class ReactNativeFiberHostComponent {
  _children: Array<Instance | number>;
  _nativeTag: number;
  viewConfig: ReactNativeBaseComponentViewConfig;

  constructor(tag: number, viewConfig: ReactNativeBaseComponentViewConfig) {
    this._nativeTag = tag;
    this._children = [];
    this.viewConfig = viewConfig;
  }

  blur() {
    TextInputState.blurTextInput(this._nativeTag);
  }

  focus() {
    TextInputState.focusTextInput(this._nativeTag);
  }

  measure(callback: MeasureOnSuccessCallback) {
    UIManager.measure(this._nativeTag, mountSafeCallback(this, callback));
  }

  measureInWindow(callback: MeasureInWindowOnSuccessCallback) {
    UIManager.measureInWindow(this._nativeTag, mountSafeCallback(this, callback));
  }

  measureLayout(relativeToNativeNode: number, onSuccess: MeasureLayoutOnSuccessCallback, onFail /* currently unused */
  : () => void) {
    UIManager.measureLayout(this._nativeTag, relativeToNativeNode, mountSafeCallback(this, onFail), mountSafeCallback(this, onSuccess));
  }

  setNativeProps(nativeProps: Object) {

    var updatePayload = ReactNativeAttributePayload.create(nativeProps, this.viewConfig.validAttributes);

    UIManager.updateView(this._nativeTag, this.viewConfig.uiViewClassName, updatePayload);
  }
}

// eslint-disable-next-line no-unused-expressions
(ReactNativeFiberHostComponent.prototype: NativeMethodsMixinType);

module.exports = ReactNativeFiberHostComponent;