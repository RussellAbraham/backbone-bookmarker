/*global Backbone */

var app = app || {};

(function(){

    'use strict';

	var BookmarkModel = Backbone.Model.extend({

		sync: Backbone.localforage.sync("backbone-bookmark"),

		defaults: function () {
			return {
				title: "",
				uri: "",
                // collection is initialized to the app object before any models are created
                // reference the collection here
				order: app.Bookmarks.nextOrder()
			}
		}

	});

    app.BookmarkModel = BookmarkModel;
    
})();