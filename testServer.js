
var IP_ADDRESS = "127.0.0.1";
var PORT = 1234;

var SERVER_NAME="MediaServer";

var SERVER_PATH = "./www";

var http = require('http');

var path = require('path');

var spawn = require('child_process').spawn;

var fs = require('fs');

http.createServer(takeRequest).listen(PORT, IP_ADDRESS);
console.log('Server running at http://' + IP_ADDRESS + ':' + PORT + '/');

function FileLoader() {};

FileLoader['.html'] = new File('text/html');

FileLoader['.xml'] = new File('text/xml');

FileLoader['.png'] = new File('image/png');

FileLoader['.css'] = new File('text/css');

FileLoader['.js'] = new File('text/javascript');

FileLoader['.jpeg'] = new File('image/jpeg');

FileLoader['.jpg'] = new File('text/jpg');

FileLoader['.ogv'] = new MovieFile('video/ogg');

FileLoader['.mp4'] = new File('video/mp4');

function MovieFile(contentType){
	
	var self = this;
	
	this.shouldSendContentInParts = function(request, contentLength) {
        return request.headers['range'] ? true : false;
	};
	
	this.extractOffsetPositionFromRequestHeader = function(requestHeaderRangeField) {
        (/^bytes=(\d.*)-(\d.*)?/).exec(requestHeaderRangeField);
        return RegExp.$1;
	};

	this.extractEndPositionFromRequestHeader = function(requestHeaderRangeField) {
        (/^bytes=(\d.*)-(\d.*)?/).exec(requestHeaderRangeField);
        return RegExp.$2;
	};

	this.calcContentLength = function(size, offestPosition, endPosition) {
		var contentLength = endPosition ? size - endPosition : size;
		return contentLength - offestPosition;
	};

	this.buildContentRangeString = function(size, offestPosition, endPosition) {
		return 'bytes ' + offestPosition + '-' + (endPosition ? endPosition : size-1) + '/' + size;
	};

	this.loadData = function(req, res, filePath) {
        var header = new HTTPResponseHeader(contentType);
        header.setCacheControl('max-age=21600');

        console.log(req.headers);
	    console.log(req.url);
		
		fs.stat(SERVER_PATH + filePath, function(err, stats) {
            if(err) {
                var response = new Response(req, res, 404, header, '404 Not Found');
                response.send();
            }

			header.setLastModified((new Date(stats["mtime"])).toGMTString());

            if(self.shouldSendContentInParts(req, stats.size)) {
                fs.open(SERVER_PATH + filePath, 'r', function(err, fd){
                    if (err) {
                        throw err;
                    }
                    console.log('file ' + SERVER_PATH + filePath + ' is open to read.206');
                    
                    var offestPosition = self.extractOffsetPositionFromRequestHeader(req.headers['range']);
					var endPosition = self.extractEndPositionFromRequestHeader(req.headers['range']);
                    var contentLength = self.calcContentLength(stats.size, offestPosition, endPosition);
                    
                    var buffer = new Buffer(contentLength);
                    
                    fs.read(fd, buffer, 0, contentLength, offestPosition, function(err, bytesRead){
                        if (err) {
                            throw err;
                        }
                        fs.close(fd, function(){
                            console.log('file ' + SERVER_PATH + filePath + ' closed.');
                        });
                        console.log('File lenght: ' + bytesRead);
                        header.setContentLength(contentLength);
                        header.setContentRange(self.buildContentRangeString(stats.size, offestPosition, endPosition));
						header.setAcceptRanges('bytes');
						header.setEtag('1-' + contentLength);
                        header.setExpires((new Date(Date.parse(new Date()) + 6 * 3600000)).toGMTString());
                        console.log(header.getFields());
                        var response = new Response(req, res, 206, header, buffer);
                        response.send();
                    });
                });
            }
            else {
		        header.setContentLength(stats.size);
		        header.setAcceptRanges('bytes');
		        
		        fs.readFile(SERVER_PATH + filePath, function (err, data) {
		            if (err) throw err;
		            var response = new Response(req, res, 200, header, data);
		            response.send();
		        });
			}
		});
	};
}

function File(contentType){
	
	var self = this;

	this.loadData = function(req, res, filePath) {
        var header = new HTTPResponseHeader(contentType);
		
		fs.stat(SERVER_PATH + filePath, function(err, stats) {
            if(err) {
                var response = new Response(req, res, 404, header, '404 Not Found');
                response.send();
            }
            else {
                fs.readFile(SERVER_PATH + filePath, function (err, data) {
                    if (err) throw err;
                    header.setContentLength(stats.size);
                    var response = new Response(req, res, 200, header, data);
                    response.send();
                });
            }
		});
	};
}

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

function takeRequest(req, res) {
	/*
	console.log(req.headers);
	console.log(req.url);
	*/
	var extname = path.extname(req.url);
	var basename = path.basename(req.url);
	if(extname == '' && basename == '') {
		FileLoader['.html'].loadData(req, res, req.url + 'index.html');
	}
	else if(FileLoader[extname]) {
		FileLoader[extname].loadData(req, res, req.url);
	}
	else {
		console.log('extention ' + extname + ' not found.');
		var header = new HTTPResponseHeader('text/plain');
		var response = new Response(req, res, 406, header, '406 Not Acceptable.');
		response.send();
	}
}
