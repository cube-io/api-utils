var resError = require("./res.error.js");
var reqUploadToS3 = require("./req.uploadToS3.js");
var cu = require("cubeio-js-util");

module.exports = function(req, res, next) {
    resError(req, res, cu.p(next, function() {
        reqUploadToS3(req, res, next);
    }));
};
