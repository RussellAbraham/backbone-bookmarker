/*global Backbone */

var app = app || {};

(function(){
    'use strict';

	var Router = Backbone.Router.extend({
		
        preinitialize: function () {
			this.container = new app.BookmarkContainer();
		},
		
		routes: {
			"": "home",
			form: "form",
			export: "export"
		},
		
		initialize: function () {
			Backbone.history.start();
		},
		
		form: function () {
			this.container.$table.hide();
			this.container.$form.show();
		},
		
		home: function () {
			this.container.$form.hide();
			this.container.$table.show();
		},
		
        // collection export to json
		export: function () {
			app.Bookmarks.export();
		}
		
	});

    app.BookmarkerRouter = Router;
    
})();