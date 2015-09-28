var BaseView = require('../lib/base_view');
var template = require('./templates/home');
var CountView = require('./count_view');
var app = require('../application');

var HomeView = BaseView.extend({
  el: 'body',
  template: template,

  //events: function () {
	  //'click #menu-add-user': 'onAddUser',
  //},


  afterRender: function () {
	  //this.countView = new CountView();
	  //this.countView.render();
	  console.log('test: ', window.test);
  },

  onAddUser: function () {
	  app.allUsers.create();
  }



});

module.exports = HomeView;
