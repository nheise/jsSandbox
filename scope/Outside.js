var testOutside = {
   echo : function(){
      console.log( 'test is: ' + this.test );
   }
};

var insideModule = require( './InsideModule.js' );

insideModule.addFunctions( testOutside );
insideModule.echo( testOutside );