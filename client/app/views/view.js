require('lib/view_helper');

// Base class for all views.
module.exports = Backbone.View.extend({
  initialize: function () {
    this.render = _.bind(this.render, this);
  },

  template: function () { return null; },
  getRenderData: function () { return null; },

  render: function () {
    this.$el.html(this.template(this.getRenderData()));
    this.afterRender();
    return this;
  },

  afterRender: function () { return null; }
});
