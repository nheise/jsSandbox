
var IP_ADDRESS = "127.0.0.1";
var PORT = 1234;

var SERVER_NAME="RESThttp Test Server";

var SERVER_PATH = "./www";

var http = require('http');

http.createServer(takeRequest).listen(PORT, IP_ADDRESS);
console.log('Server running at http://' + IP_ADDRESS + ':' + PORT + '/');

function takeRequest(req, res) {
	
	console.log(req.headers);
	console.log(req.url);
	
	if(req.headers.authorization) {
		
		var httpAuthorization = new HTTPAuthorization();
		
		var userPass = httpAuthorization.extractCredentialsFromRequestHeader( req.headers );
		
		console.log( userPass );

		res.writeHead(200, 'OK', { 'Content-Type' : 'text/plain' });
		res.end("checking...", 'binary');
	}
	else {
		res.writeHead(401, 'Unauthorized', { 'Content-Type' : 'text/plain', 'WWW-Authenticate' : 'Basic realm="Locked Space"' });
		res.end();
	}
}

function HTTPAuthorization() {
	
	this.extractCredentialsFromRequestHeader = function( requestHeader ) {
		var base64EncodedCredentials = extractbase64EncodedCredentials( requestHeader );
		var decodedCredentials = decodeCredentials( base64EncodedCredentials );
		return extractCredentialsFromDecodedCredentials( decodedCredentials );
	};
	
	function extractCredentialsFromDecodedCredentials( decodedCredentials ) {
		var array = decodedCredentials.split(":");
		return { user : array[0], password : array[1] };
	}
	
	function decodeCredentials( base64EncodedCredentials ) {
		var buffer = new Buffer(base64EncodedCredentials, 'base64');
		return buffer.toString('utf8');
	}
	
	function extractbase64EncodedCredentials( requestHeader ) {
		return requestHeader.authorization.split(" ")[1];
	}
	
}

/*
function Response(request, response, httpStatusCode, header, data) {
	
	this.request = 	request;

	this.response = response;

	this.httpStatusCode = httpStatusCode;

	this.header = header;

	this.data = data | "";
    
    this.send = function() {
		response.writeHead(httpStatusCode, header.getFields());
		response.end(data, 'binary');
	};
	
	this.sendOnlyHeader = function() {
		response.writeHead(httpStatusCode, header.getFields());
		response.end();
	};

}

function HTTPResponseHeader(contentType, contentLength) {
	
	var httpResponseHeaderFields = {};
	
	httpResponseHeaderFields['Server'] = SERVER_NAME;
	httpResponseHeaderFields['Date'] = (new Date()).toGMTString();
	httpResponseHeaderFields['Content-Type'] = contentType;
	if(contentLength) {
	   httpResponseHeaderFields['Content-Length'] = contentLength;
    }

	this['Expires'] = '';

	this.getFields = function() {
		return httpResponseHeaderFields;
	};

	this.setLastModified = function(date) {
		httpResponseHeaderFields['Last-Modified'] = date;
	};
    
    this.setContentType = function(contentLength) {
		httpResponseHeaderFields['Content-Type'] = contentLength;
	};
	
	this.setContentLength = function(contentLength) {
		httpResponseHeaderFields['Content-Length'] = contentLength;
	};
	
	this.setContentRange = function(contentRange) {
		httpResponseHeaderFields['Content-Range'] = contentRange;
	};
	
	this.setAcceptRanges = function(value) {
		httpResponseHeaderFields['Accept-Ranges'] = value;
	};
	
	this.setCacheControl = function(value) {
		httpResponseHeaderFields['Cache-Control'] = value;
	};
	
	this.setExpires = function(value) {
		httpResponseHeaderFields['Expires'] = value;
	};

	this.setEtag = function(value) {
		httpResponseHeaderFields['Etag'] = value;
	};
	
}
*/