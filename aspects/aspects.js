
function Aspects() {};

Aspects.after = function( method, object, aspect ) {
    console.log( object );
    var original = object[ method ];
    
    object[ method ] = function() {
        var originalReturnValue = original.apply( this, arguments );
        
        pushValueTo( originalReturnValue, arguments );
        
        console.log(arguments);
        
        aspect.apply( this, arguments );
        
        return originalReturnValue;
    };
    
    function pushValueTo( originalReturnValue, arguments ) {
       arguments[ nextArgumentNumber( arguments ) ] = originalReturnValue;
    }
    
    function nextArgumentNumber( arguments ) {
       return Object.keys(arguments).length;
    }
};

function A() {
    
    this.methodA = function( arg1, arg2 ) {
        console.log( 'method A ' + arg1 + " # " + arg2 );
        return "return value from A";
    };
}

var a = new A();

Aspects.after( 'methodA', a, function( arg1, arg2, returnValue ) {
  console.log( "after call methodA with " + arg1 + " # " + arg2 + " # " + returnValue );  
} );

console.log( a.methodA( 'arg1', 'arg2' ) ); 