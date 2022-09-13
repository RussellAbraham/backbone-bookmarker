/* global Backbone */

var app = app || {};

(function(){

    'use strict';

	var BookmarkCollection = Backbone.Collection.extend({
		
        // todo: setup file picker, parse json from backup file, add to collection
        import: function (json) {
			var self = this;
			json.forEach(function (obj) {
				return self.create(obj);
			});
		},
		
        // export bookmarks to JSON file
        export: function () {
			var data = JSON.stringify(this.toJSON(), null, 2);
			var blob = new Blob([data], { type: "application/json" });
			this.url = window.URL.createObjectURL(blob);
			this.anchor = document.createElement("a");
			this.anchor.href = this.url;
			this.anchor.download = "export-" + Date.now() + ".json";
			this.anchor.click();
			URL.revokeObjectURL(this.url);
			delete this.url;
			delete this.anchor;
		},

		sync: Backbone.localforage.sync("backbone-bookmarks"),
		
        model: app.BookmarkModel,
		
        comparator: "order",
		
        nextOrder: function () {
			return this.length ? this.last().get("order") + 1 : 1;
		},

		drop: function () {
			while (this.models.length) {
				this.models[0].destroy();
			}
		}

	});

    // initialize the collection to the app object
    app.Bookmarks = new BookmarkCollection();
    
})();