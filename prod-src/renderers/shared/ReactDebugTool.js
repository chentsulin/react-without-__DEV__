/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugTool
 * @flow
 */

'use strict';

var ReactInvalidSetStateWarningHook = require('ReactInvalidSetStateWarningHook');
var ReactHostOperationHistoryHook = require('ReactHostOperationHistoryHook');
var ExecutionEnvironment = require('fbjs/lib/ExecutionEnvironment');
var { ReactComponentTreeHook } = require('ReactGlobalSharedState');

var performanceNow = require('fbjs/lib/performanceNow');

var warning;


import type { ReactElement } from 'ReactElementType';
import type { DebugID } from 'ReactInstanceType';
import type { Operation } from 'ReactHostOperationHistoryHook';

type Hook = any;

type TimerType = 'ctor' | 'render' | 'componentWillMount' | 'componentWillUnmount' | 'componentWillReceiveProps' | 'shouldComponentUpdate' | 'componentWillUpdate' | 'componentDidUpdate' | 'componentDidMount';

type Measurement = {
  timerType: TimerType;
  instanceID: DebugID;
  duration: number;
};

type TreeSnapshot = {
  [key: DebugID]: {
    displayName: string;
    text: string;
    updateCount: number;
    childIDs: Array<DebugID>;
    ownerID: DebugID;
    parentID: DebugID;
  }
};

type HistoryItem = {
  duration: number;
  measurements: Array<Measurement>;
  operations: Array<Operation>;
  treeSnapshot: TreeSnapshot;
};

export type FlushHistory = Array<HistoryItem>;

// Trust the developer to only use this with a __DEV__ check
var ReactDebugTool = ((null: any): typeof ReactDebugTool);

var hooks, didHookThrowForEvent, isProfiling, flushHistory, lifeCycleTimerStack, currentFlushNesting, currentFlushMeasurements, currentFlushStartTime, currentTimerDebugID, currentTimerStartTime, currentTimerNestedFlushDuration, currentTimerType, lifeCycleTimerHasWarned, lastMarkTimeStamp, canUsePerformanceMeasure: boolean, url;


module.exports = ReactDebugTool;