
var assert = require( 'assert' );

var singleton = require( './singleton.js' );

assert.equal("firstChange", singleton.getSingletonText(), "singleton text should be.");

singleton.secondChange();

assert.equal("secondChange", singleton.getSingletonText(), "singleton text should be.");