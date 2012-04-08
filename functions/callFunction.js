function Object() {
  var str = "hallo welt!!";

  var innerFunc = function() {
    console.log( 'inner func' );
  }

  this.go = function( question ) {
    console.log( str + " " + question );
    innerFunc();
  }
}

var obj = {
  test : new Object().go
}

obj.test( 'Wie geht es dir heute??' );
