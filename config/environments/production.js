module.exports = function(compound) {
  var app;

  app = compound.app;
  return app.configure('production', function() {
    app.use(require('express').errorHandler());
    return app.enable('quiet');
  });
};