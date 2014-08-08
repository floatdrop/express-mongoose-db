# express-mongoose-db
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]
> Connect once and memorize connection for next usages

## Usage

First - install middleware in project:

```npm i express-mongoose-db --save```

Second - add middleware to express application:

```javascript
var app = require('express')();
app.use(require('express-mongoose-db')());
```

Now you can access `mongoose.connection` object of `mongoose` module in any following middleware or route handler in express.

## API

#### express-mongoose-db([options])

## Options

You can pass options to constructor of middleware function like this: `require('express-mongoose-db')(options)` where `options` is an object with fields described below.

Also you can modify defaults value in `config` property of middleware contructor like this:

```javascript
var mongoosedb = require('express-mongoose-db');
mongoosedb.config.readPreference = 'secondary';

var app = require('express')();
app.use(mongoosedb());

app.get('/', function(req, res) {
    var connection = require('mongoose').connection;
});

```

 * `host` - server or replica string (default: `localhost`, but can be `server.one.com:123,server.two.com:456`)
 * `db` - name of database (default: `test`)
 * `options` - object, that passed to [MongoClient.connect](http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#read-preference).
 * And all options from [connect-once](https://github.com/floatdrop/connect-once), such as `reconnectWait` and `heartbeat` function.


## Events

To know what's up in your life, we provide event-emitter to listen to. For example - this is how you know, that reconnecton happening:

```javascript
var mongoosedb = require('express-mongoose-db')(options);
mongoosedb.connection.on('reconnect', function(err) {
    console.log("Reconnecting to mongo (" + this.retries + " retries left). " + (err.stack ? err.stack : err));
});
```

Also you can subscribe on connection event:

```javascript
var mongoosedb = require('express-mongoose-db')(options);
mongoosedb.connection.when('available', function(err, db) {

});
```

`express-mongoose-db` will start attempts to connect straight after require.

[npm-url]: https://npmjs.org/package/express-mongoose-db
[npm-image]: https://badge.fury.io/js/express-mongoose-db.png

[travis-url]: http://travis-ci.org/floatdrop/express-mongoose-db
[travis-image]: https://travis-ci.org/floatdrop/express-mongoose-db.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/express-mongoose-db
[depstat-image]: https://david-dm.org/floatdrop/express-mongoose-db.png?theme=shields.io
