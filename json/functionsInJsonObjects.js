var object = {
   'attr1' : 'attr1Value',
   'func1' : function() {
      console.log( 'test function call.' );
   }
}

console.log( JSON.stringify( object ) );
object.func1();
var parsedObject = JSON.parse( JSON.stringify( object ) );
console.log( parsedObject );
parsedObject.func1();
