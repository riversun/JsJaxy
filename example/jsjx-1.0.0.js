/*
 * JsJaxy version 1.0.0
 * Easy to Convert XML to Javascript Object
 *
 *  Copyright (c) 2006- Tom Misawa, riversun.org@gmail.com
 *  
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *  
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *  
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 *  
 */

//namespace declaration
var org;
if (typeof org === 'undefined') {
    org = {};
}

if (typeof org.riversun === 'undefined') {
    org.riversun = {};
}

if (typeof org.riversun.xml === 'undefined') {
    org.riversun.jsjx = {};
}

// class declaration
org.riversun.jsjx = {

    XmlParser: function () {

        // associative array that contains the node name that should be treated
        // as array as keys
        var arrayNodeName = {};

        this.parseDocument = _parse;
        this.addArrayElementName = _addArrayElementName;
        this.removeArrayElementName = _removeArrayElementName;

        function _parse(doc) {

            var node = doc.documentElement;

            var resultObject = {};

            // Start recursive scanning the DOM tree
            _searchNodes(node, resultObject, null, "");

            return resultObject;
        }

        function _addArrayElementName(ns) {
            arrayNodeName[ns] = {};
        }

        function _removeArrayElementName(ns) {
            arrayNodeName[ns] = null;
        }

        function _searchNodes(node, parentObject, grandParentObject, parentNS) {

            var crrNS = (parentNS != "" ? parentNS + "." : "") + node.nodeName;

            // If this node has child nodes
            if (node.hasChildNodes()) {

                // Object to pass to the lower level
                var destinationObject;

                // node.nodeName appears first means null
                if (parentObject[node.nodeName] == null) {

                    // set object which named this node's id
                    parentObject[node.nodeName] = {};

                    // Node object of this layer that should be passed to lower
                    // layer
                    destinationObject = parentObject[node.nodeName];

                    // If the node is included in the 'arrayNodeName',treat it
                    // as an array at the first time.
                    if (arrayNodeName[crrNS] != null) {

                        // Memory the node that was set as normal object at the
                        // first time
                        var oldSiblingObj = parentObject[node.nodeName];

                        // Overwrite the object that was specified as a
                        // node.nodeName at the parent layer to an array-object.
                        parentObject[node.nodeName] = [];

                        // Re-insert the object that was set at the first time
                        // (in this case it's a STRING) to an array object
                        parentObject[node.nodeName].push(oldSiblingObj);

                    }

                } else {
                    // if the object have been set,it means it was called more
                    // than 2 times.So that,the object should be handled as an
                    // array-object.
                    // If the object that is in the parentObject[node.nodeName]
                    // is NOT an array-object,create an array-object.

                    if ((typeof parentObject[node.nodeName] == 'string')
                        || !parentObject[node.nodeName].length) {

                        // Memory the node that was set as normal object at the
                        // first time
                        var oldSiblingObj = parentObject[node.nodeName];

                        // Overwrite the object that was specified as a
                        // node.nodeName at the parent layer to an array-object.
                        parentObject[node.nodeName] = [];

                        // Re-insert the object that was set at the first time
                        // (in this case it's a STRING) to an array object
                        parentObject[node.nodeName].push(oldSiblingObj);
                    }

                    // Node object of this layer that should be passed to lower
                    // layer
                    destinationObject = {};

                    parentObject[node.nodeName].push(destinationObject);

                }

                for (var i = 0; i < node.childNodes.length; i++) {
                    // Do recursive operation for the child nodes
                    _searchNodes(node.childNodes.item(i), destinationObject,
                        parentObject, crrNS);
                }

            } else {
                // If this node does not have child nodes,This is a text node.

                if (node.nodeType == 3
                    & (node.nodeValue != null && node.nodeValue
                    .indexOf('\n') < 0)) {

                    // grandParentObject[node.parentNode.nodeName] is NOT an
                    // array
                    if ((typeof grandParentObject[node.parentNode.nodeName] == 'object')
                        & !grandParentObject[node.parentNode.nodeName].length) {
                        grandParentObject[node.parentNode.nodeName] = node.nodeValue;
                    }
                    // grandParentObject[node.parentNode.nodeName] is an array
                    else if ((typeof grandParentObject[node.parentNode.nodeName] == 'object')
                        & grandParentObject[node.parentNode.nodeName].length > 0) {

                        // POP object and PUSH it as a string.
                        grandParentObject[node.parentNode.nodeName].pop();
                        grandParentObject[node.parentNode.nodeName]
                            .push(node.nodeValue);

                    }
                }
            }
        }
    }
};

