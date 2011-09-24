
exports.addFunctions = function( toFunction ){
   toFunction.test = "Hello test !!!";
};

exports.echo = function( echoFunction ) {
  echoFunction.echo(); 
};