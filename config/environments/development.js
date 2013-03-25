var express;

express = require('express');

module.exports = function(compound) {
  var app;

  app = compound.app;
  return app.configure('development', function() {
    app.enable('log actions');
    app.enable('env info');
    app.enable('watch');
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
};