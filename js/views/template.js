var app = app || {};

(function(){
    'use strict';

    // underscore templates used in the project
	app.templates = {		
		bookmark: _.template(
			'<td><a class="text-muted"><%- order %></a></td>'+
			'<td><a class="text-primary" target="_blank" href="<%- uri %>"><%- title %></a></td>' +
				"<td>" +
				'<a class="read text-info">R</a>' +
				"<span> | </span>" +
				'<a class="top text-muted" target="_blank" href="<%- uri %>">B</a>' +
				"<span> | </span>" +
				'<a class="update text-warning" target="_self" href="<%- uri %>">U</a>' +
				"<span> | </span>" +
				'<a class="text-danger destroy">X</a>' +
				"</td>"
		)
	};

    var BookmarkItem = Backbone.View.extend({
		tagName: "tr",
		className: "",
		template: app.templates.bookmark,
		events: {
			"click .read": "read",
			"click .update": "beginUpdate",
			"click .destroy": "clear"
		},
		initialize: function () {
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		read: function (event) {
			event.stopPropagation();
			alert(JSON.stringify(this.model.toJSON(), null, 2));
		},
		clear: function () {
			this.model.destroy();
		},
		beginUpdate: function (event) {
			console.log(this.model.toJSON());
			return;
		},
		cancelUpdate: function () {},
		commitUpdate: function () {}
	});

    app.BookmarkItem = BookmarkItem;
    
})();