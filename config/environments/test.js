var express;

express = require('express');

module.exports = function(compound) {
  var app;

  app = compound.app;
  return app.configure('test', function() {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.enable('quiet');
    app.enable('view cache');
    app.enable('model cache');
    return app.enable('eval cache');
  });
};