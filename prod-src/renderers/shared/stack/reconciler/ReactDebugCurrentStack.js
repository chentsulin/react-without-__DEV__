/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugCurrentStack
 * @flow
 */

'use strict';

import type { DebugID } from 'ReactInstanceType';

const ReactDebugCurrentStack = {};

var { ReactComponentTreeHook }, { getStackAddendumByID, getCurrentStackAddendum };


module.exports = ReactDebugCurrentStack;