
var uri = '/test/service?key1=value1&key2=value2;matrix1=123';

var url = require('url');

var uriParts = url.parse( uri );
console.log(uriParts);

var queryString = require('querystring');

var queryStringParts = queryString.parse( uriParts.query );
console.log(queryStringParts);
