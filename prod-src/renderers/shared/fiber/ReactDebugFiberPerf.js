/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugFiberPerf
 * @flow
 */

import type { Fiber } from 'ReactFiber';

type MeasurementPhase = 'componentWillMount' | 'componentWillUnmount' | 'componentWillReceiveProps' | 'shouldComponentUpdate' | 'componentWillUpdate' | 'componentDidUpdate' | 'componentDidMount' | 'getChildContext';

// Trust the developer to only use this with a __DEV__ check
let ReactDebugFiberPerf = ((null: any): typeof ReactDebugFiberPerf);

module.exports = ReactDebugFiberPerf;