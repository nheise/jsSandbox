
exports.configuration = [
    {method:'GET', path:'/test/:id', callback:loadIndex},
    {method:'GET', path:'/test/image/:filename', callback:loadImage},
    {method:'GET', path:'/test/css/:filename', callback:loadFile},
    {method:'GET', path:'/test/js/:filename', callback:loadFile},
    {method:'GET', path:'/test/video/:filename', callback:loadFile}
];

var path = require('path');

var responseLoader = require('./ResponseLoader.js').responseLoader;

var FILE_PATH = './www';

function loadIndex(req, res, id) {
    console.log('receive id:' + id);
    responseLoader['.html'].loadData(req, res, FILE_PATH + '/test/index.html');
}

function loadImage(req, res, filename) {
    console.log( FILE_PATH + '/images/' + filename);
    var extname = path.extname(req.url);
    responseLoader[extname].loadData(req, res, FILE_PATH + '/test/images/' + filename);
}

function loadFile(req, res) {
    var extname = path.extname(req.url);
    responseLoader[extname].loadData(req, res, FILE_PATH + req.url);
}