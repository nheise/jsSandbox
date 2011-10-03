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
