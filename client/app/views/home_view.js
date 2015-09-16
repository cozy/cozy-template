var BaseView = require('../lib/base_view');
var template = require('./templates/home');

var HomeView = BaseView.extend({
  el: 'body',
  template: template
});

module.exports = HomeView;
