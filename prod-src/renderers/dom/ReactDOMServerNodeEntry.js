/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMServerNodeEntry
 */

'use strict';

var ReactDOMStringRenderer = require('ReactDOMStringRenderer');
var ReactDOMNodeStreamRenderer = require('ReactDOMNodeStreamRenderer');
var ReactVersion = require('ReactVersion');

require('ReactDOMInjection');

module.exports = {
  renderToString: ReactDOMStringRenderer.renderToString,
  renderToStaticMarkup: ReactDOMStringRenderer.renderToStaticMarkup,
  renderToStream: ReactDOMNodeStreamRenderer.renderToStream,
  renderToStaticStream: ReactDOMNodeStreamRenderer.renderToStaticStream,
  version: ReactVersion
};