/**
 * Created by usman on 2/28/16.
 */

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;


// Bootstrap application settings
require('./config/express')(app);

// Bootstrap models
var db = require('./config/sequalize');

// Bootstrap routes
require('./routes')(app, db);

app.listen(port);
console.log('Express app started on port ' + port);
