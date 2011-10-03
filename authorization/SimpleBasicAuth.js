
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
   
   if(req.url.match(/.+?secure.*/)) {
    
       if(req.headers.authorization) {
           
           var httpAuthorization = new HTTPAuthorization();
           
           var userPass = httpAuthorization.extractCredentialsFromRequestHeader( req.headers );
           
           console.log( userPass );

           res.writeHead(200, 'OK', { 'Content-Type' : 'text/plain' });
           res.end("secure ... checking...", 'binary');
       }
       else {
           res.writeHead(401, 'Unauthorized', { 'Content-Type' : 'text/plain', 'WWW-Authenticate' : 'Basic realm="Locked Space"' });
           res.end();
       } 
   }
   else {
       res.writeHead(200, 'OK', { 'Content-Type' : 'text/plain' });
        res.end("free area...", 'binary');
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