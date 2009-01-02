//example for JsJaxy
var xml = '<?xml version="1.0" encoding="UTF-8"?>'
    + '<info>'
    + '<basicinfo><firstname>John</firstname><lastname>Doe</lastname></basicinfo>'
    + '<exinfo><address>Boston,MA</address><telephone>xxxx-xxxx-xxxx</telephone></exinfo>'
    + '<friendlist>' +
    '<name>john</name>' +
    '<name>jack</name>' +
    '<name>sara</name>' +
    '</friendlist>' +
    '<pclist>'
+ '<pcinfo><os>linux</os><cpu>i7</cpu></pcinfo>'
'</pclist>'
+ '</info>';

//create DOMParser object
var domParser = new DOMParser();

//get document object from XML text
var doc = domParser.parseFromString(xml, 'application/xml');

//create JsJaxy XMLParser
var xmlParser = new org.riversun.jsjx.XmlParser();

//To treat the element that has specified name as ARRAY
xmlParser.addArrayElementName('info.friendlist.name');

//the element 'info.pclist.pcinfo' will be treated as an ARRAY object even if the element appears only one time.
xmlParser.addArrayElementName('info.pclist.pcinfo');

var root = xmlParser.parseDocument(doc);

//print the results
console.log('JsJaxy Eample\n==============')
console.log('firstname=' + root.info.basicinfo.firstname);
console.log('lastname=' + root.info.basicinfo.lastname);

console.log('address=' + root['info']['exinfo']['address']);

for (var i in root.info.friendlist.name) {
    console.log('friendlist.name[' + i + ']' + root.info.friendlist.name[i]);
}

console.log('info.pclist.pcinfo.os=' + root.info.pclist.pcinfo[0].os);
console.log('info.pclist.pcinfo.cpu=' + root.info.pclist.pcinfo[0].cpu);
