
/**
 * Module dependencies.
 */

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require("express");
var qt = require("quickthumb");

var winston = require('winston');
var pkg = require('../package.json');
var env = process.env.NODE_ENV || 'development';
var exphbs = require('express-handlebars'); 
/**
 * Expose
 */

module.exports = function (app) {

  app.engine('handlebars', exphbs({defaultLayout: 'main'}));
  app.set('view engine', 'handlebars');

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }


  // bodyParser should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true

  }));
  app.use(bodyParser.json({
    strict: false
  }));
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization, Accept');
    next();
  });
  app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));
  // cookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use('/public', qt.static(__dirname+'/../public', {
    type: "crop"
  }));
};
