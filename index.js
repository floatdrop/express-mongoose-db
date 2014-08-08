'use strict';

var mongoose = require('mongoose');
var connectOnce = require('connect-once');

module.exports = function (options) {
    options = options || {};
    options = {
        host: options.host || '127.0.0.1:27017',
        db: options.db || 'test',
        retries: options.retries || 60,
        reconnectWait: options.reconnectWait || 1000,
        options: options.options
    };

    var connection = new connectOnce(
        options,
        function connect(cb) {
            mongoose.connect('mongodb://' + options.host + '/' + options.db, options.options);
            var db = mongoose.connection;
            db.on('error', cb);
            db.once('open', cb.bind(null, null, db));
        }
    );

    var f = function (req, res, next) {
        connection.when('available', function (err, db) {
            if (err) {
                return next(err);
            }
            req.db = db;
            next();
        });
    };

    f.connection = connection;

    return f;
};
