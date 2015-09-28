var ViewCollection = require('../lib/view_collection');
var template = require('../views/templates/count_user_list');
var CountUserRow = require('../models/user');

var CountUserListView = ViewCollection.extend({
	el: '#count-user-list',
	template: template,

	collectionEl: '#count-user-list-content',
	itemView: CountUserRow,

});

module.exports = CountUserListView;
