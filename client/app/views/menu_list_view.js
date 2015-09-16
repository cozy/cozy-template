// Exemple use ViewCollection

var ViewCollection = require('../lib/view_collection');
var MenuRowView = require('./menu_row_view');
var template = require('./templates/menu_list');

var MenuListView = ViewCollection.extend({
  el: '#menu',
  template: template,

  collectionEl: 'ul#menu-collection',
  itemView: MenuRowView,

  initialize: function (attributes) {
    this.collection = attributes.collection;
    ViewCollection.prototype.initialize.call(this);
  }
});

module.exports = MenuListView;
