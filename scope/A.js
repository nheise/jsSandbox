
exports.createA = function(arg1) {
    return new A( arg1 );
};

function A( arg1 ){
    
    A.prototype.methodA = function() {
        console.log( 'methodA ' + arg1 );
    };
};
