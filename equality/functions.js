
var assert = require('assert');

var func1 = function function1() {
   var a = 1;
   a = a + 2;
};

var func2 = function function2() {
   var a = 1;
   a = a + 2;
};

assert.ok( func1 == func1 , 'func1 == func1' );
assert.ok( func2 == func2 , 'func2 == func2' );
assert.ok( func1 != func2, 'func1 != func2' );

assert.ok( func1.name == 'function1' , 'func1.name == \'function1\'' );
assert.ok( func1.name != 'function2', 'func1.name != \'function2\'' );

console.log( 'all success :)' );