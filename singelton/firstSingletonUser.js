
var assert = require( 'assert' );

var singleton = require( './singleton.js' );

assert.equal( 1, singleton.getCount(), "count should be.");

assert.equal( "noChange", singleton.getSingletonText(), "singleton text should be.");

singleton.firstChange();

assert.equal( "firstChange", singleton.getSingletonText(), "singleton text should be.");