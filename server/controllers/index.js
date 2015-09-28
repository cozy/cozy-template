
module.exports.index = function (req, res, next) {
	res.render('index.jade', imports("window.test = 'plop'"));
};

