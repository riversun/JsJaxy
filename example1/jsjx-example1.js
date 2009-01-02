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

