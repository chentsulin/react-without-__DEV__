/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPerf
 * @flow
 */

'use strict';

var ReactDebugTool = require('ReactDebugTool');
var lowPriorityWarning = require('lowPriorityWarning');
var alreadyWarned = false;

import type { FlushHistory } from 'ReactDebugTool';

function roundFloat(val, base = 2) {
  var n = Math.pow(10, base);
  return Math.floor(val * n) / n;
}

// Flow type definition of console.table is too strict right now, see
// https://github.com/facebook/flow/pull/2353 for updates
function consoleTable(table: Array<{ [key: string]: any }>): void {
  console.table((table: any));
}

function warnInProduction() {
  if (alreadyWarned) {
    return;
  }
  alreadyWarned = true;
  if (typeof console !== 'undefined') {
    console.error('ReactPerf is not supported in the production builds of React. ' + 'To collect measurements, please use the development build of React instead.');
  }
}

function getLastMeasurements() {
  warnInProduction();
  return [];
}

function getExclusive(flushHistory = getLastMeasurements()) {
  warnInProduction();
  return [];


  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, timerType, applyUpdate) {
    var { displayName } = treeSnapshot[instanceID];
    var key = displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key,
        instanceCount: 0,
        counts: {},
        durations: {},
        totalDuration: 0
      };
    }
    if (!stats.durations[timerType]) {
      stats.durations[timerType] = 0;
    }
    if (!stats.counts[timerType]) {
      stats.counts[timerType] = 0;
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }
}

function getInclusive(flushHistory = getLastMeasurements()) {
  warnInProduction();
  return [];


  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var { displayName, ownerID } = treeSnapshot[instanceID];
    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }

  var isCompositeByID = {};
}

function getWasted(flushHistory = getLastMeasurements()) {
  warnInProduction();
  return [];


  var aggregatedStats = {};
  var affectedIDs = {};

  function updateAggregatedStats(treeSnapshot, instanceID, applyUpdate) {
    var { displayName, ownerID } = treeSnapshot[instanceID];
    var owner = treeSnapshot[ownerID];
    var key = (owner ? owner.displayName + ' > ' : '') + displayName;
    var stats = aggregatedStats[key];
    if (!stats) {
      affectedIDs[key] = {};
      stats = aggregatedStats[key] = {
        key,
        instanceCount: 0,
        inclusiveRenderDuration: 0,
        renderCount: 0
      };
    }
    affectedIDs[key][instanceID] = true;
    applyUpdate(stats);
  }
}

function getOperations(flushHistory = getLastMeasurements()) {
  warnInProduction();
  return [];


  var stats = [];
}

function printExclusive(flushHistory?: FlushHistory) {
  warnInProduction();


  var stats = getExclusive(flushHistory);
  var table = stats.map(item => {
    var { key, instanceCount, totalDuration } = item;
    var renderCount = item.counts.render || 0;
    var renderDuration = item.durations.render || 0;
    return {
      Component: key,
      'Total time (ms)': roundFloat(totalDuration),
      'Instance count': instanceCount,
      'Total render time (ms)': roundFloat(renderDuration),
      'Average render time (ms)': renderCount ? roundFloat(renderDuration / renderCount) : undefined,
      'Render count': renderCount,
      'Total lifecycle time (ms)': roundFloat(totalDuration - renderDuration)
    };
  });
}

function printInclusive(flushHistory?: FlushHistory) {
  warnInProduction();


  var stats = getInclusive(flushHistory);
  var table = stats.map(item => {
    var { key, instanceCount, inclusiveRenderDuration, renderCount } = item;
    return {
      'Owner > Component': key,
      'Inclusive render time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
}

function printWasted(flushHistory?: FlushHistory) {
  warnInProduction();


  var stats = getWasted(flushHistory);
  var table = stats.map(item => {
    var { key, instanceCount, inclusiveRenderDuration, renderCount } = item;
    return {
      'Owner > Component': key,
      'Inclusive wasted time (ms)': roundFloat(inclusiveRenderDuration),
      'Instance count': instanceCount,
      'Render count': renderCount
    };
  });
}

function printOperations(flushHistory?: FlushHistory) {
  warnInProduction();


  var stats = getOperations(flushHistory);
  var table = stats.map(stat => ({
    'Owner > Node': stat.key,
    Operation: stat.type,
    Payload: typeof stat.payload === 'object' ? JSON.stringify(stat.payload) : stat.payload,
    'Flush index': stat.flushIndex,
    'Owner Component ID': stat.ownerID,
    'DOM Component ID': stat.instanceID
  }));
}

var warnedAboutPrintDOM = false;
function printDOM(measurements: FlushHistory) {
  lowPriorityWarning(warnedAboutPrintDOM, '`ReactPerf.printDOM(...)` is deprecated. Use ' + '`ReactPerf.printOperations(...)` instead.');
  warnedAboutPrintDOM = true;
  return printOperations(measurements);
}

var warnedAboutGetMeasurementsSummaryMap = false;
function getMeasurementsSummaryMap(measurements: FlushHistory) {
  lowPriorityWarning(warnedAboutGetMeasurementsSummaryMap, '`ReactPerf.getMeasurementsSummaryMap(...)` is deprecated. Use ' + '`ReactPerf.getWasted(...)` instead.');
  warnedAboutGetMeasurementsSummaryMap = true;
  return getWasted(measurements);
}

function start() {
  warnInProduction();
}

function stop() {
  warnInProduction();
}

function isRunning() {
  warnInProduction();
  return false;
}

var ReactPerfAnalysis = {
  getLastMeasurements,
  getExclusive,
  getInclusive,
  getWasted,
  getOperations,
  printExclusive,
  printInclusive,
  printWasted,
  printOperations,
  start,
  stop,
  isRunning,
  // Deprecated:
  printDOM,
  getMeasurementsSummaryMap
};

module.exports = ReactPerfAnalysis;