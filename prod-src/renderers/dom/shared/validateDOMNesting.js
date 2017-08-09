/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule validateDOMNesting
 */

'use strict';

var emptyFunction = require('fbjs/lib/emptyFunction');
var getComponentName = require('getComponentName');

var validateDOMNesting = emptyFunction;

var warning, { getCurrentFiberStackAddendum }, specialTags, inScopeTags, buttonScopeTags, impliedEndTags, emptyAncestorInfo, updatedAncestorInfo, isTagValidWithParent, findInvalidAncestorForTag, findOwnerStack, getOwnerInfo, didWarn;


module.exports = validateDOMNesting;