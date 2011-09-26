
var insideClass = require( './InsideModule.js' ).insideClass;

insideClass.prototype.echo2 = function() {
  console.log( this.hello + "2" ); 
};

function OutsideClass() {
   this.hello = this.hello + ' outside';
}

OutsideClass.prototype = new insideClass();

var outside = new OutsideClass();
outside.echo();
outside.echo2();