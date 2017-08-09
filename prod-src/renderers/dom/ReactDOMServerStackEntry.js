/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMServerStackEntry
 */

'use strict';

var ReactServerRendering = require('ReactServerRendering');
var ReactVersion = require('ReactVersion');

require('ReactDOMInjection');
require('ReactDOMStackInjection');

var ReactDOMServerStack = {
  renderToString: ReactServerRendering.renderToString,
  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
  version: ReactVersion
};

var ReactInstrumentation, ReactDOMUnknownPropertyHook, ReactDOMNullInputValuePropHook, ReactDOMInvalidARIAHook;


module.exports = ReactDOMServerStack;