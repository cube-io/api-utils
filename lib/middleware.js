var resError = require("./res.error.js");
var reqUploadToS3 = require("./req.uploadToS3.js");
var async = require("async");

module.exports = function(req, res, next) {
    async.series([
        resError.bind(this, req, res),
        reqUploadToS3.bind(this, req, res)
    ], next);
};
