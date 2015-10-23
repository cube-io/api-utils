var _ = require("lodash");
var cu = require("cubeio-js-util");
var AWS = require("aws-sdk");

module.exports = function(req, res, next) {
    req.uploadToS3 = function(options, callback) {
        var mimetype = req.get("Content-Type");
        if(options.allowedMimetypes && !_.contains(options.allowedMimetypes, mimetype)) {
            req.resume();
            return cu.nextTick(callback, new Error("invalid content type " + mimetype + ", not an allowed mimetype: " + options.allowedMimetypes));
        }
        if(!options.s3) {
            req.resume();
            return cu.nextTick(callback, new Error("missing s3 options"));
        }
        if(!options.file) {
            req.resume();
            return cu.nextTick(callback, new Error("missing file options"));
        }
        if(!options.file.Key) {
            req.resume();
            return cu.nextTick(callback, new Error("missing file key option"));
        }
        if(!options.file.Bucket) {
            req.resume();
            return cu.nextTick(callback, new Error("missing file bucket option"));
        }

        var s3 = new AWS.S3(options.s3);
        s3.upload({
            Bucket: options.file.Bucket,
            Key: options.file.Key,
            Body: req,
            ContentType: mimetype
        }, callback);
    };
    next();
};
