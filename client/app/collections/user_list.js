var User = require('../models/user');

var UserList = Backbone.Collection.extend({
	model: User,
	url: 'userlist',

});

module.exports = UserList;
