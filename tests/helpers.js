// See cozy-fixtures documentation for testing on https://github.com/jsilvestre/cozy-fixtures#automatic-tests
var fixtures = require('cozy-fixtures')
  , helpers = {};

helpers.options = {};
helpers.app = null;

// server management
helpers.startApp = function (done) {
  var americano = require('americano');

  var host = helpers.options.serverHost || "127.0.0.1";
  var port = helpers.options.serverPort || 9250;
  var _this = this;
  americano.start({name: 'template', 'host': host, 'port': port}, function (app, server) {
    _this.app = app;
    _this.app.server = server;
    done();
  });
};
helpers.stopApp = function (done) {
  this.app.server.close(done);
}

// database helper
helpers.cleanDB = function (done) {
  fixtures.resetDatabase({'callback': done});
};

helpers.cleanDBWithRequests = function (done) {
  fixtures.resetDatabase({'removeAllRequests': true, 'callback': done});
};

module.exports = helpers;