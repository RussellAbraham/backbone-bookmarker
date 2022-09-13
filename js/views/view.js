/* global Backbone */

var app = app || {};

(function(){
    'use strict';

	var BookmarkContainer = Backbone.View.extend({

		el: $(document.documentElement),

		events: {
			"submit form": "handler",
			"click .toggle-button": "click"
		},

		statsTemplate: _.template($("#stats-template").html()),

		initialize: function () {
			this.$form = this.$(".form");
			this.$uri = this.$("#uri");
			this.$name = this.$("#name");
			this.$context = this.$(".context");
			this.$table = this.$(".table");
			this.$bookmarks = this.$("#bookmarks");
			this.$footer = this.$("footer");
			this.listenTo(app.Bookmarks, "add", this.addOne);
			this.listenTo(app.Bookmarks, "reset", this.addAll);
			this.listenTo(app.Bookmarks, "all", _.debounce(this.render, 0));
			app.Bookmarks.fetch({ reset : true });
		},

		render: function () {
			this.$footer.html(
				this.statsTemplate({
					length: app.Bookmarks.length
				})
			);
		},

		addOne: function (item) {
			var bookmark = new app.BookmarkItem({ model: item });
			this.$bookmarks.append(bookmark.render().el);
		},

		addAll: function () {
			this.$bookmarks.html("");
			app.Bookmarks.each(this.addOne, this);
		},

		newAttributes: function () {
			return {
				title: this.$name.val(),
				uri: this.$uri.val(),
				order: app.Bookmarks.nextOrder(),
			};
		},

		handler: function (event) {
			event.preventDefault();
			event.stopPropagation();
			app.Bookmarks.create(this.newAttributes());
			event.target.reset();
		}
	});

    app.BookmarkContainer = BookmarkContainer;
    
})();