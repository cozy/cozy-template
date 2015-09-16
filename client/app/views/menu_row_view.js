// Exemple use ViewCollection

var BaseView = require('../lib/base_view');
var template = require('./templates/menu_row');

var MenuRowView = BaseView.extend({
  template: template,

  className: 'menu-element',
  tagName: 'li',

  getRenderData: function () {
    return {model: this.model.toJSON()};
  }

  // Add some cool stuff here
});

module.exports = MenuRowView;
