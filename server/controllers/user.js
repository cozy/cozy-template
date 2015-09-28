var UserModel = require('../models/user');

module.exports.fetchAll = function (req, res) {
	UserModel.request('all', function (err, data) {
		if (err !== null) {
			console.error(err);
			res.status(500).send({msg:'Error fetching'});
			return;
		}
		res.status(200).send(data);
	});
}
