function Aspects() {

   this.after = function( object, methodName, aspectBody ) {

      var originalMethod = object[methodName];

      var aspect = function() {

         var val = originalMethod.apply( arguments.caller, arguments );
         aspectBody( arguments, val );

         return val;
      };

      object[methodName] = aspect;
   };

};

function A() {
   this.methodA = function( arg1, arg2 ) {
      console.log( 'method A ' + arg1 + " # " + arg2 );
      return "return value from A";
   };
}

var a = new A();

var aspects = new Aspects();

aspects.after( a, "methodA", function( args, returnValue ) {
   console.log( "after call methodA with args:" );
   console.log( args );
   console.log( returnValue );
} );

console.log( 'original call return: ' + a.methodA( 'arg1', 'arg2' ) );