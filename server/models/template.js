// See documentation on https://github.com/cozy/cozy-db

var cozydb = require('cozydb');

var TemplateModel = cozydb.getModel('Template', {
  title: String,
  date: Date,
  content: String
});

module.exports = TemplateModel;
