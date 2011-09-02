
function Aspects() {};

Aspects.after = function( method, object, aspect ) {
    console.log( object );
    var original = object[ method ];
    
    object[ method ] = function() {
        var args = original.apply( this, arguments );
        return ret = aspect.apply( this, Array( args, null ) );
    };
};

function A() {
    
    this.methodA = function( arg ) {
        console.log( 'method A ' + arg );
    };
}

var a = new A();

Aspects.after( 'methodA', a, function() {
  console.log( "after methodA" );  
} );

a.methodA( 'arg1' );