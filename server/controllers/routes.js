// See documentation on https://github.com/frankrousseau/americano#routes

var user = require('./user');
var index = require('./index');

module.exports = {

	'': {
		get: index.index
	},

  'userlist': {
    get: user.fetchAll
  }
};

