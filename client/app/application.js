// Application bootstrapper.
var Application = {
  initialize: function () {
    var HomeView = require('views/home_view'), Router = require('lib/router'),
      MenuListView = require('views/menu_list_view'),
      MenuCollection = require('../collections/menu_collection');

    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.homeView = new HomeView();
    this.homeView.render();


    this.menuCollection = new MenuCollection();

    this.menuListView = new MenuListView({collection: this.menuCollection});
    this.menuListView.render();

    this.router = new Router();

    if (typeof Object.freeze === 'function') {
      Object.freeze(this);
    }
  }
};

module.exports = Application;
