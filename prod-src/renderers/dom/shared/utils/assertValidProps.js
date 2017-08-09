/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule assertValidProps
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var voidElementTags = require('voidElementTags');

var warning;


var HTML = '__html';

function getDeclarationErrorAddendum() {
  return '';
}

function assertValidProps(tag: string, props: ?Object, getCurrentOwnerName: () => ?string) {
  if (!props) {
    return;
  }
  // Note the use of `==` which checks for null or undefined.
  if (voidElementTags[tag]) {
    invariant(props.children == null && props.dangerouslySetInnerHTML == null, '%s is a void element tag and must neither have `children` nor ' + 'use `dangerouslySetInnerHTML`.%s', tag, getDeclarationErrorAddendum(getCurrentOwnerName));
  }
  if (props.dangerouslySetInnerHTML != null) {
    invariant(props.children == null, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.');
    invariant(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' + 'for more information.');
  }

  invariant(props.style == null || typeof props.style === 'object', 'The `style` prop expects a mapping from style properties to values, ' + "not a string. For example, style={{marginRight: spacing + 'em'}} when " + 'using JSX.%s', getDeclarationErrorAddendum(getCurrentOwnerName));
}

module.exports = assertValidProps;