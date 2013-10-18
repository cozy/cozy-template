var should = require('should')
    , Client = require('request-json').JsonClient
    , helpers = require('./helpers');

helpers.options = {
    serverHost: 'localhost',
    serverPort: '8888'
};

var client = new Client("http://"+helpers.options.serverHost+":"+helpers.options.serverPort+"/");

describe("Template test", function () {

  before(helpers.startApp);
  after(helpers.stopApp);

  describe("When I GET /foo", function () {

    this.err = null;
    this.res = null;
    this.body = null;
    var _this = this;
    before(function (done) {
      client.get('foo', function (err, res, body) {
          _this.err = err;
          _this.res = res;
          _this.body = body;
          done();
      });
    });

    it("It should sends me a successful Hello World!", function () {
      should.not.exist(_this.err);
      should.exist(_this.res);
      _this.res.should.have.property('statusCode');
      _this.res.statusCode.should.equal(200);

      should.exist(_this.body);
      _this.body.should.have.property('message');
      _this.body.message.should.equal('Hello, world!');
    });
  });
});