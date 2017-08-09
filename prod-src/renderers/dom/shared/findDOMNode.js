/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule findDOMNode
 * @flow
 */

var ReactInstanceMap = require('ReactInstanceMap');
var { ELEMENT_NODE } = require('HTMLNodeType');
var { ReactCurrentOwner } = require('ReactGlobalSharedState');

var getComponentName = require('getComponentName');
var invariant = require('fbjs/lib/invariant');

var warning;


let findFiber = function () {
  invariant(false, 'Missing injection for fiber findDOMNode');
};
let findStack = function () {
  invariant(false, 'Missing injection for stack findDOMNode');
};

const findDOMNode = function (componentOrElement: Element | ?ReactComponent<any, any, any>): null | Element | Text {
  if (componentOrElement == null) {
    return null;
  }
  if ((componentOrElement: any).nodeType === ELEMENT_NODE) {
    return (componentOrElement: any);
  }

  var inst = ReactInstanceMap.get(componentOrElement);
  if (inst) {
    if (typeof inst.tag === 'number') {
      return findFiber(inst);
    } else {
      return findStack(inst);
    }
  }

  if (typeof componentOrElement.render === 'function') {
    invariant(false, 'Unable to find node on an unmounted component.');
  } else {
    invariant(false, 'Element appears to be neither ReactComponent nor DOMNode. Keys: %s', Object.keys(componentOrElement));
  }
};

findDOMNode._injectFiber = function (fn) {
  findFiber = fn;
};
findDOMNode._injectStack = function (fn) {
  findStack = fn;
};

module.exports = findDOMNode;