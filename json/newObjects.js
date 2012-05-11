function Object() {
  var var1 = 'hallo welt, ';

  this.echoFunc = function( question ) {
    console.log( var1 + question );
  }
}

var jsonObject = {
  test1 : 'wie geht es dir heute?',
  test2 : new Object()
}

jsonObject.test2.echoFunc( jsonObject.test1 );

var json = JSON.stringify(jsonObject);
console.log( json );
