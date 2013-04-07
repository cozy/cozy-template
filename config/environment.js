var express = require('express');

module.exports = function(compound) {
  var app = compound.app;
  var cwd = process.cwd();
    
  app.use(express.static(cwd + '/client/public', {maxAge: 86400000}));
  app.set('view engine', 'jade');
  app.set('view options', {complexNames: true});
  app.set('jsDirectory', '/javascripts/');
  app.set('cssDirectory', '/stylesheets/');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
};

