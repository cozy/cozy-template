(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var has = ({}).hasOwnProperty;

  var aliases = {};

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf('components/' === 0)) {
        start = 'components/'.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return 'components/' + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var expand = (function() {
    var reg = /^\.\.?(\/|$)/;
    return function(root, name) {
      var results = [], parts, part;
      parts = (reg.test(name) ? root + '/' + name : name).split('/');
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part === '..') {
          results.pop();
        } else if (part !== '.' && part !== '') {
          results.push(part);
        }
      }
      return results.join('/');
    };
  })();
  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  globals.require = require;
})();
require.register("application", function(exports, require, module) {
var UserList = require('collections/user_list');

// Application bootstrapper.
var Application = {
  initialize: function () {
	var Router = require('./router');

    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin


	this.router = new Router();


    if (typeof Object.freeze === 'function') {
      Object.freeze(this);
    }
  }
};

module.exports = Application;

});

require.register("collections/user_list", function(exports, require, module) {
var User = require('../models/user');

var UserList = Backbone.Collection.extend({
	model: User,
	url: 'userlist',

});

module.exports = UserList;

});

require.register("initialize", function(exports, require, module) {
var application = require('application');

$(function () {
  application.initialize();
  Backbone.history.start();
});

});

require.register("lib/base_view", function(exports, require, module) {
require('lib/view_helper');

// Base class for all views.
var BaseView = Backbone.View.extend({
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

module.exports = BaseView;

});

require.register("lib/view_collection", function(exports, require, module) {

var BaseView = require('./base_view');

/*
   View that display a collection of subitems
   used to DRY views
   Usage : new ViewCollection(collection:collection)
   Automatically populate itself by creating a itemView for each item
   in its collection

   can use a template that will be displayed alongside the itemViews

   itemView       : the Backbone.View to be used for items
   itemViewOptions : the options that will be passed to itemViews
   collectionEl : the DOM element's selector where the itemViews will
   be displayed. Automatically falls back to el if null
   */

var ViewCollection = BaseView.extend({
  itemView: null,
  views: {},
  collectionEl: null,

  appendView: function (view) {
    this.$collectionEl.append(view.el);
  },

  initialize: function () {
    BaseView.prototype.initialize.call(this);
    this.views = {};
    this.listenTo(this.collection, 'reset', this.onReset);
    this.listenTo(this.collection, 'add', this.addItem);
    this.listenTo(this.collection, 'remove', this.removeItem);

    if (this.collectionEl === null || undefined) {
      this.collectionEl = this.el;
    }
  },

  render: function () {
    for (id in this.views) {
      this.views[id].$el.detach();
    }
    BaseView.prototype.render.call(this);
    return this;
  },

  afterRender: function () {
    this.$collectionEl = $(this.collectionEl);
    for (id in this.views) {
      this.appendView(this.views[id]);
    }
    this.onReset(this.collection);
  },

  remove: function () {
    this.onReset();
    BaseView.prototype.remove.call(this);
  },

  onReset: function (newCollection) {
    for (id in this.views) {
      view.remove();
    }
    newCollection.forEach(this.addItem);
  },

  addItem: function (model) {
    view = new this.itemView({model: model});
    this.views[model.cid] = view.render();
    this.appendView(view);
  },


  removeItem: function (model) {
    this.views[model.cid].remove();
    delete this.views[model.cid];
  }
})

module.exports = ViewCollection;

});

require.register("lib/view_helper", function(exports, require, module) {
// Put your handlebars.js helpers here.

});

;require.register("models/user", function(exports, require, module) {


var User = Backbone.Model.extend({
	name: null,
	description: null,
	history: null,


});

module.exports = User;

});

require.register("router", function(exports, require, module) {

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

});

require.register("views/count_user_list_view", function(exports, require, module) {
var ViewCollection = require('../lib/view_collection');
var template = require('../views/templates/count_user_list');
var CountUserRow = require('../models/user');

var CountUserListView = ViewCollection.extend({
	el: '#count-user-list',
	template: template,

	collectionEl: '#count-user-list-content',
	itemView: CountUserRow,

});

module.exports = CountUserListView;

});

require.register("views/count_user_row_view", function(exports, require, module) {
var BaseView = require('../lib/base_view');
var template = require('templates/count_user_row');


var CountUserRow = BaseView.extend({
	template: template,

});

});

require.register("views/count_view", function(exports, require, module) {
var BaseView = require('../lib/base_view');
var template = require('./templates/count');
var CountUserListView = require('./count_user_list_view');
var CountUserList = require('../collections/user_list');

var CountView = BaseView.extend({
	el: '#content-screen',
	template: template,

	initialize: function () {
		this.listUser = new CountUserList();
		BaseView.prototype.initialize.call(this);
	},

	afterRender: function () {
		this.listUsersView = new CountUserListView();
		this.listUsersView.render();
	},

});

module.exports = CountView;



});

require.register("views/home_view", function(exports, require, module) {
var BaseView = require('../lib/base_view');
var template = require('./templates/home');
var CountView = require('./count_view');
var app = require('../application');

var HomeView = BaseView.extend({
  el: 'body',
  template: template,

  //events: function () {
	  //'click #menu-add-user': 'onAddUser',
  //},


  afterRender: function () {
	  //this.countView = new CountView();
	  //this.countView.render();
	  console.log('test: ', window.test);
  },

  onAddUser: function () {
	  app.allUsers.create();
  }



});

module.exports = HomeView;

});

require.register("views/templates/count", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="count-user-list"></div>');
}
return buf.join("");
};
});

require.register("views/templates/count_user_list", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<label for="count-menu-users">Users</label><ul id="count-user-list-content" class="list-group"></ul>');
}
return buf.join("");
};
});

require.register("views/templates/count_user_row", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
}
return buf.join("");
};
});

require.register("views/templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container-fluid"><div id="left-menu" class="sidebar"><label for="menu-section">Count</label><ul id="menu-section" class="nav nav-sidebar"><li><a id="menu-all-count">All Count</a></li><ul id="menu-list-count"></ul><li><a id="menu-add-count">Create a Count</a></li></ul><label for="menu-section">Users</label><ul id="menu-section" class="nav nav-sidebar"><li><a id="menu-all-user">All User</a></li><ul id="menu-list-user"></ul><li><a id="menu-add-user">Create a User</a></li></ul></div><div id="content-screen" class="content container-fluid"></div></div>');
}
return buf.join("");
};
});


//# sourceMappingURL=app.js.map