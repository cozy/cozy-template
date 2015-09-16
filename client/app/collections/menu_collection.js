// Exemple of ViewCollection use

var MenuModel = require('../models/menu_model');

var MenuCollection = Backbone.Collection.extend({
  model: MenuModel,
  url: 'menu'

  // Add some cool stuff here
});

module.exports = MenuCollection;
