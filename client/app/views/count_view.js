var BaseView = require('../lib/base_view');
var template = require('./templates/count');
var CountUserListView = require('./count_user_list_view');
var CountUserList = require('../collections/user_list');

var CountView = BaseView.extend({
	el: '#content-screen',
	template: template,

	initialize: function () {
		this.listUser = new CountUserList();
		BaseView.prototype.initialize.call(this);
	},

	afterRender: function () {
		this.listUsersView = new CountUserListView();
		this.listUsersView.render();
	},

});

module.exports = CountView;


