// See documentation on https://github.com/frankrousseau/americano-cozy/#models

var americano = require('americano');

var TemplateModel = americano.getModel('Template', {
  title: String,
  date: Date,
  content: String
});

module.exports = TemplateModel;
