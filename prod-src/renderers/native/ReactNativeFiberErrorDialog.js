/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeFiberErrorDialog
 * @flow
 */

'use strict';

const ExceptionsManager = require('ExceptionsManager');

import type { CapturedError } from 'ReactFiberScheduler';

/**
 * Intercept lifecycle errors and ensure they are shown with the correct stack
 * trace within the native redbox component.
 */
function ReactNativeFiberErrorDialog(capturedError: CapturedError): boolean {
  const { componentStack, error } = capturedError;

  let errorToHandle: Error;

  // Typically Errors are thrown but eg strings or null can be thrown as well.
  if (error instanceof Error) {
    const { message, name } = error;

    const summary = message ? `${name}: ${message}` : name;

    errorToHandle = error;

    try {
      errorToHandle.message = `${summary}\n\nThis error is located at:${componentStack}`;
    } catch (e) {}
  } else if (typeof error === 'string') {
    errorToHandle = new Error(`${error}\n\nThis error is located at:${componentStack}`);
  } else {
    errorToHandle = new Error(`Unspecified error at:${componentStack}`);
  }

  ExceptionsManager.handleException(errorToHandle, false);

  // Return false here to prevent ReactFiberErrorLogger default behavior of
  // logging error details to console.error. Calls to console.error are
  // automatically routed to the native redbox controller, which we've already
  // done above by calling ExceptionsManager.
  return false;
}

module.exports.showDialog = ReactNativeFiberErrorDialog;