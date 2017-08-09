/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactFiberStack
 * @flow
 */

'use strict';

import type { Fiber } from 'ReactFiber';

export type StackCursor<T> = {
  current: T
};

var warning;


const valueStack: Array<any> = [];

var fiberStack: Array<Fiber | null>;


let index = -1;

exports.createCursor = function <T>(defaultValue: T): StackCursor<T> {
  return {
    current: defaultValue
  };
};

exports.isEmpty = function (): boolean {
  return index === -1;
};

exports.pop = function <T>(cursor: StackCursor<T>): void {
  if (index < 0) {
    return;
  }

  cursor.current = valueStack[index];

  valueStack[index] = null;

  index--;
};

exports.push = function <T>(cursor: StackCursor<T>, value: T): void {
  index++;

  valueStack[index] = cursor.current;

  cursor.current = value;
};

exports.reset = function (): void {
  while (index > -1) {
    valueStack[index] = null;

    index--;
  }
};