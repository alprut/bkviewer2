(function($) {
$.fn.show_bookmarks = function(options) {
return this.each(function() {
	function init(target, context) {
	}

	function add_category_view(json, target, context) {
		console.log("category: " + json.title);
	}

	function add_item_view(json, target, context) {
		console.log("item: " + json.title + ": " + json.url);
	}

	function fini(target, context) {
	}

/* Generic functions */

	function make_category_view(target, category, context, opts,
				    category_is_first) {
		var children;
		var i;
		var category_view;
		var item;
		var is_empty = true;
		var category_set = new Array();
		var item_set = new Array();

		children = category.children;

		// not category folder ?
		if (category.url) {
			return;
		}

		// Category is empty ?
		if (! category.children) {
			return;
		}

		for (i = 0; i < children.length; i++) {
			item = children[i];

			if (item.url) {
				item_set.push(item);
			} else {
				category_set.push(item);
			}
		}

		if (category_is_first) {
			for (i = 0; i < category_set.length; i++) {
				make_category_view(target, category_set[i],
						   context, opts, false);
			}
		}

		if (item_set.length != 0)
			opts.add_category_view(category, target, context);

		for (i = 0; i < item_set.length; i++) {
			item = item_set[i];

			// TODO: Adds favicon
			favicon_tag = opts.add_item_view(item, target, context);
		}

		if (! category_is_first) {
			for (i = 0; i < category_set.length; i++) {
				make_category_view(target, category_set[i],
						   context, opts, false);
			}
		}
	}

	function add_view(target, json, options) {
		var i;
		var defaults = {
			init:		   init,
			add_category_view: add_category_view,
			add_item_view:     add_item_view,
			fini:		   fini
		};
		var context = new Object;
		var opts = $.extend({}, defaults, options);

		opts.init(target, context);

		make_category_view(target, json, context, opts, true);

		opts.fini(target, context);
	}

	function test_add_view(target, bk_node, options) {
		console.log(options);
	}

	var t = $(this);

	var done;

	done = browser.bookmarks.getTree();
	done.then(function(bk_tree) {
			// It shows only bookmarks under the folder "Bookmark Menu".
			add_view(t, bk_tree[0].children[0], options);
		  },
		  function(error) {
			console.log(`Error on getting bookmarks: ${error}`);
		  });

})}} (jQuery));

(function($) {
$.fn.stylist = function(json) {
return this.each(function() {
	var style = "";

	for (var i in json) {
		style += i + " {\n";
		for (var j in json[i]) {
			style += "\t" + j + ":" + json[i][j] + ";\n";
		}
		style += "}\n";
	}

        $(this).text(style);

})}} (jQuery));
