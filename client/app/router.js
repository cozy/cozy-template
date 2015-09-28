
var HomeView = require('views/home_view');

var Router = Backbone.Router.extend({

	mainView: null,

	routes: {
		''		: 'mainBoard'
	},


	mainBoard: function () {
		view = new HomeView();

		var self = this;
		this.displayView(view, self);
	},


	displayView: function (view, self) {
		if (self.mainView !== null) {
			self.mainView.remove();
		}
		self.mainView = view;
		$('.application').append(view.$el);
		view.render();
	}



});

module.exports = Router;
