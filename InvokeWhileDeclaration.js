
var invokationCounter = 0;

function verifyCall( functionToVerify ) {
	
	return function() {
		invokationCounter ++;
		functionToVerify.apply( this, arguments );
	};
	
}

function doit( callback ) {
	callback( 'doit result' );
}

doit( verifyCall( function( result ) {
	console.log( result );
} ) );

console.log( "invokation counter: " + invokationCounter );