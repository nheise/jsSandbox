
var IP_ADDRESS = "127.0.0.1";
var PORT = 1234;

var SERVER_NAME="RESThttp Test Server";

var http = require('http');

var HTTPAuthorization = require( './HTTPAuthorization.js' ).HTTPAuthorization;

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

           res.writeHead(200, 'OK', { 'Content-Type' : 'text/html' });
           res.end( secureArea, 'binary');
       }
       else {
           res.writeHead(401, 'Unauthorized', { 'Content-Type' : 'text/plain', 'WWW-Authenticate' : 'Basic realm="Locked Space"' });
           res.end();
       } 
   }
   else {
       res.writeHead(200, 'OK', { 'Content-Type' : 'text/html' });
        res.end( freeArea, 'binary');
   }
}

var secureArea =
"<html>" + 
"<head></head>" + 
"<body>" + 
"<p>secure ... checking...</p>" + 
"<p><a href='/secure/link'>link in secure area...</a></p>" +
"<p><form action='/secure/post' method='POST'>" +
"<input name='test' type='text' value='post test'/>" +
"<input type='submit' value='submit'/>" +
"</form></p>" +
"<p><input type='button' onclick='sendAjax();' value='send AJAX'/></p>" +
"<script>" +
"<!--//\n" +
"function sendAjax() {" +
"var request = new XMLHttpRequest();" +
"request.open('HEAD', '/secure/ajax', true);" +
"request.onreadystatechange = function (aEvt) {" +
"  if (request.readyState == 4) {" +
"     if (request.status == 200)" +
"       alert(request.responseText);" +  
"     else" +
"       alert('Error', request.statusText);" +  
"  }" +
"};" +
"request.send(null);" +
"}\n" +
"//-->" +
"</script>" +
"</body>" +
"</html>";

var freeArea =
"<html>" + 
"<head></head>" + 
"<body>" + 
"<p>free area...</p>" + 
"<p><a href='/secure'>to secure area...</a></p>" +
"</body>" +
"</html>";