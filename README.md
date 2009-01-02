# Overview
'JsJaxy' is a JavaScript library for converting XML to JavaScript object

Easy to parse XML(xml document) and convert into JavaScript object.
```XML
<parent><child>I'm here</child></parent>
```
Allow you to get the value of 'child' element by writing like '**root.parent.child**'.

It is licensed under [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).
# Quick Start 1
**Example Code**
```JavaScript
var xmlParser = new org.riversun.jsjx.XmlParser();

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://riversun.github.io/example.xml', true);
xhr.onreadystatechange = function () {

    if (xhr.readyState == 4) {

        if (xhr.status == 200) {
            var doc = xhr.responseXML;

            //do parse
            var root = xmlParser.parseDocument(doc);

            //show element
            console.log(root.info.basicinfo.firstname);
        }
    }

};
xhr.send(null);


```
# Classes & methods
## org.riversun.jsjx.XmlParser class
### Constructor
create a parser object
```JavaScript
var xmlParser = new org.riversun.jsjx.XmlParser();
```

### addArrayElementName([FULLPATH ELEMENT NAME]);  
To specify the element name to be handled as an array.
The specified element will be handled as an ARRAY object even if the element appears only one time.

How to specify the element name.
If you want to handle following element,
```XML
<info><friendlist><name>
```
just set as follows.
```JavaScript
xmlParser.addArrayElementName('info.pclist.pcinfo');

```

### parseDocument([XML DOCUMENT]);
To convert XML to JavaScript Object  
```JavaScript
//create DOMParser object
var domParser = new DOMParser();

//'xml' is a stext.doc is xml document.
var doc = domParser.parseFromString(xml, 'application/xml');

var root = xmlParser.parseDocument(doc);
```
So you can easily handle XML as JavaScript object like as follows.
```JavaScript
console.log('firstname=' + root.info.basicinfo.firstname);
```

Access array element like this way.
```JavaScript
console.log('info.pclist.pcinfo.os=' + root.info.pclist.pcinfo[0].os);
```

# Quick Start 2
Here's a little example program to handle the XML.

## XML example
```XML
<?xml version="1.0" encoding="UTF-8"?>
<info>
	<basicinfo>
		<firstname>John</firstname>
		<lastname>Doe</lastname>
	</basicinfo>
	<exinfo>
		<address>Boston,MA</address>
		<telephone>xxxx-xxxx-xxxx</telephone>
	</exinfo>
	<friendlist>
		<name>john</name>
		<name>jack</name>
		<name>sara</name>
	</friendlist>
	<pclist>
		<pcinfo>
			<os>linux</os>
			<cpu>i7</cpu>
		</pcinfo>
	</pclist>
</info>
```

## JavaScript Example Code
- **jsjx-example-1.0.0.js**

```JavaScript
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

```

## Example HTML

- **jsjx.html**

```HTML
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width"/>
    <meta name="format-detection" content="telephone=no"/>
    <title></title>
    <script type="text/javascript" src="jsjx-1.0.0.js"></script>
    <script type="text/javascript" src="jsjx-example-1.0.0.js"></script>
</head>
<body>
<h3>JsJaxy Example</h3>
Please see console log on your browser.
```
