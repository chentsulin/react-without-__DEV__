/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warnValidStyle
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');

var warnValidStyle = emptyFunction;

var camelizeStyleName, getComponentName, warning, { getCurrentFiberOwnerName }, badVendoredStyleNamePattern, badStyleValueWithSemicolonPattern, warnedStyleNames, warnedStyleValues, warnedForNaNValue, warnedForInfinityValue, warnHyphenatedStyleName, warnBadVendoredStyleName, warnStyleValueWithSemicolon, warnStyleValueIsNaN, warnStyleValueIsInfinity, checkRenderMessage;


module.exports = warnValidStyle;