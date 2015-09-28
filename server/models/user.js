
var cozydb = require('cozydb');

var User = cozydb.getModel('Debt-User', {
	name: String,
	description: String,
});

module.exports = User;
