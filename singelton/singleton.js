
var singletonText = "noChange";

exports.getSingletonText = function() {
    return singletonText;
};

exports.firstChange = function() {
    singletonText = "firstChange";
};

exports.secondChange = function() {
    singletonText = "secondChange";
};