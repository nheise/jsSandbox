/*
var util = require('util');
var events = require('events');

function TestEmitter() {
	
	var self = this;
	
	this.execute = function() {
		setTimeout(emitNow, 100, "start", "start");
		setTimeout(emitNow, 200, "data", "data1");
		setTimeout(emitNow, 300, "data", "data2");
		setTimeout(emitNow, 400, "data", "data3");
		setTimeout(emitNow, 500, "end", "end");
	};
	
	function emitNow(event, data) {
		self.emit(event, data);
	}
}
util.inherits(TestEmitter, events.EventEmitter);

var testEmitter = new TestEmitter();

function TestObserver() {
	this.log = function(msg) {
		console.log(msg);
	};
}

var testObserver = new TestObserver();

testEmitter.addListener("start", testObserver.log);
testEmitter.addListener("data", testObserver.log);
testEmitter.addListener("end", testObserver.log);

testEmitter.execute();
*/
/*
function Test(var1) {
	
	this.foo = function(bar) {
		return var1 + bar;
	};
}

var foo1 = new Test("hello ").foo;

console.log(foo1("world!"));
*/


var world = "world1";

var world4 = {
    text : "Was für eine Welt!!!",
    text2 : function(){
        return "Testtext";
    }
};

var text = "hello #{world}!!! #{world4.text} #{fail} #{world} #{world4.text2()} ";

function parseText( text ) {
    
    var findRegExp = /#\{([\w\(\)\.]+)\}/;
    
    var hit = text.split( findRegExp );
    
    for( i = 1; i < hit.length; i+=2 ) {
        hit[i] = evaluateHit( hit[i] );
    }
    
    return hit.join( "" );
}

function evaluateHit(hit) {
	try {
		return eval(hit);
	}
	catch(e) {
		console.log(e.message);
		return hit;
	}
}

console.log( parseText( text ) );

/*
var router = require('./RESTRouter.js');

router.addRoute('GET', '/Test/:id', function(id) {
    console.log('Test ' + id);
});

try {
    router.callRoute('GET', '/Test/ID');
}
catch(e) {
    console.log(e);
}

try {
    router.callRoute('GET', '/Test');
}
catch(e) {
    console.log(e);
}

try {
    router.callRoute('GET', '/Test/ID');
}
catch(e) {
    console.log(e);
}
*/
/*
function HTTPResponseHeader(contentType) {
	
	var httpResponseHeaderFields = {}
	
	this['Server'] = '';
	this['Date'] = 	'';
	httpResponseHeaderFields['Content-Type'] = contentType;
	this['Content-Length'] = '';
	this['Last-Modified'] = '';
	this['Expires'] = '';
	this['Cache-Control'] = '';
	this['Content-Range'] = '';

	this.getFields = function() {
		return httpResponseHeaderFields;
	}
    
    this.setContentType = function(contentLength) {
		httpResponseHeaderFields['Content-Type'] = contentLength;
	}
	
	this.setContentLength = function(contentLength) {
		httpResponseHeaderFields['Content-Length'] = contentLength;
	}	
}

var responseHeader = new HTTPResponseHeader("text/html");
function FileLoader(){};
FileLoader['html'] = 'Test';
console.log(FileLoader['html']);
*/
/*
var headerRangeFieldRegExp = new RegExp('^bytes=(\\d.*)-(\\d.*)?');

function extractRangeFromRequestHeader(requestHeaderRangeField) {
    var hits = requestHeaderRangeField.match(headerRangeFieldRegExp);
    return { begin: hits[1] ? parseInt(hits[1]) : null, end: hits[2] ? parseInt(hits[2]) : null };
}

var rangeHeader = "bytes=1-4";

var range = extractRangeFromRequestHeader(rangeHeader);

console.log(range);

var FILE_PATH = './test.txt';

var fileReader = require('./FileReader.js');

var readCallback = function(buffer, bytesRead, stats) {        
    console.log('content-size:' + stats.size)
    console.log(bytesRead + ' bytes read.');
    console.log('content:' + buffer);
}

var errorCallback = function(err) {
    console.log(err);
}

fileReader.createFileReader(readCallback, errorCallback).read('./test.txt', range.begin, range.end);
*/

/*

(/^bytes=(\d.*)-(\d.*)?/).exec(range);
console.log(RegExp.$1 + "#" + RegExp.$2);
console.log(RegExp.$2 ? "true" : "false");
*/
//console.log('expires: ' + (new Date(Date.parse(new Date())+6*3600000)).toGMTString());
