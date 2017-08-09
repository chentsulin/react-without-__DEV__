/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactFiberErrorLogger
 * @flow
 */

'use strict';

const invariant = require('fbjs/lib/invariant');

import type { CapturedError } from 'ReactFiberScheduler';

const defaultShowDialog = () => true;

let showDialog = defaultShowDialog;

function logCapturedError(capturedError: CapturedError): void {
  const logError = showDialog(capturedError);

  // Allow injected showDialog() to prevent default console.error logging.
  // This enables renderers like ReactNative to better manage redbox behavior.
  if (logError === false) {
    return;
  }

  const error = (capturedError.error: any);

  // In production, we print the error directly.
  // This will include the message, the JS stack, and anything the browser wants to show.
  // We pass the error object instead of custom message so that the browser displays the error natively.
  console.error(error);
}

exports.injection = {
  /**
   * Display custom dialog for lifecycle errors.
   * Return false to prevent default behavior of logging to console.error.
   */
  injectDialog(fn: (e: CapturedError) => boolean) {
    invariant(showDialog === defaultShowDialog, 'The custom dialog was already injected.');
    invariant(typeof fn === 'function', 'Injected showDialog() must be a function.');
    showDialog = fn;
  }
};

exports.logCapturedError = logCapturedError;