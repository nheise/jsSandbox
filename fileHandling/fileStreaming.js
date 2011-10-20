
var fs = require( 'fs' );
	
var path = "test.txt";

fs.stat( path, afterStatusCheck );

function afterStatusCheck( err, stats ) {
	
	//console.log( stats );
	
	var fileStream = fs.createReadStream( path, { start : 3, end : stats.size });
	
	fileStream.on( 'open', afterStreamOpen );
	fileStream.on( 'end', afterStreamEnd );
	fileStream.pipe( process.stdout );
}

function afterStreamEnd() {
	console.log();
	console.log( "stream close." );
}

function afterStreamOpen() {
	console.log( "stream open" );
}

/*

proxy_response.addListener('data', function(chunk) {
	response.write(chunk, 'binary');
});
proxy_response.addListener('end', function() {
	response.end();
});
response.writeHead(proxy_response.statusCode, proxy_response.headers);
});
request.addListener('data', function(chunk) {
proxy_request.write(chunk, 'binary');
});
request.addListener('end', function() {
proxy_request.end();

*/