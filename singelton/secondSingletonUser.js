
var assert = require( 'assert' );

var singleton = require( './singleton.js' );

assert.equal( 1, singleton.getCount(), "count should be.");

assert.equal( "firstChange", singleton.getSingletonText(), "singleton text should be.");

singleton.secondChange();

assert.equal( "secondChange", singleton.getSingletonText(), "singleton text should be.");