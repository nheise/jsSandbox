
var count = 0;

;(function countUp() {
    count++;
})();

exports.getCount = function() {
    return count;
};

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