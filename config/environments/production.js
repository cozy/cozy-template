module.exports = function(compound) { 
  var app = compound.app;

  app.configure('production', function () {
    app.use(require('express').errorHandler());
    app.enable('quiet');
  });
};
