
exports.insideClass = InsideClass;

function InsideClass() {
  this.hello = 'hello inside World !!!'; 
};

InsideClass.prototype.echo = function() {
   console.log( this.hello );
};