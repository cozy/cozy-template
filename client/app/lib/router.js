var application = require('application');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'home'
  },

  home: function () {
    application.menuCollection.push([
      {link: "https://github.com/mycozycloud/cozy-setup/wiki",
        name: 'Documentation'},
      {link: "https://github.com/mycozycloud/cozy-setup/wiki/Getting-started",
        name: 'Getting Started'},
      {link: "https://github.com/mycozycloud", name: 'Github'}
    ]);

  }
});
