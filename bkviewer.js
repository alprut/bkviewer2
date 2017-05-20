(function($) {
function wear(dress) {
	var style = "";

	for (var i in dress) {
		style += i + " {\n";
		for (var j in dress[i]) {
			style += "\t" + j + ":" + dress[i][j] + ";\n";
		}
		style += "}\n";
	}

	$("style").text($("style").text() + style);
}

$.fn.wear = wear;

$.fn.show_bookmarks = function(options) {
return this.each(function() {
	function init(target, pref_set, context) {
	}

	function add_category_view(json, target, pref_set, context) {
	}

	function add_item_view(json, target, pref_set, context) {
	}

	function fini(target, pref_set, context) {
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

		if (item_set.length != 0) {
			let json = { "title": category.title};

			opts.add_category_view(json, target, opts.pref_set,
					       context);
		}

		for (i = 0; i < item_set.length; i++) {
			item = item_set[i];

			let json = {
				"title": item.title,
				"uri":   item.url,
				"favicon": "icons/favicon.png"
			};

			// TODO: Adds favicon
			favicon_tag = opts.add_item_view(json, target,
							 opts.pref_set,
							 context);
		}

		if (! category_is_first) {
			for (i = 0; i < category_set.length; i++) {
				make_category_view(target, category_set[i],
						   context, opts, false);
			}
		}
	}

	function add_view(target, json, opts) {
		var context = new Object;

		wear(opts.dress(opts.pref_set));

		opts.init(target, opts.pref_set, context);

		make_category_view(target, json, context, opts, true);

		opts.fini(target, opts.pref_set, context);
	}

	var defaults = {
		init:		   init,
		add_category_view: add_category_view,
		add_item_view:     add_item_view,
		fini:		   fini,
		pref_set:	   {},
		dress:		   {}
	};
	var opts = $.extend({}, defaults, options);

	var t = $(this);
	var promise_set = [];
	var bk_tree = {};

	function get_bk_tree() {
		return new Promise(
			function(resolve, reject) {
				chrome.bookmarks.getTree(function(tree) {
					resolve(tree);
				});
			}
		);
	}

	promise_set.push(get_bk_tree().then(
		function(result) {
			bk_tree.root = result;
		},
		function(error) {
			console.log(`Error on getting bookmarks: ${error}`);
		}
	));

	for (var key in opts.pref_set) {
		promise_set.push($().get_pref(key, opts.pref_set));
	}

	promise_set.push(
		new Promise(
			function(resolve, reject) {
				chrome.tabs.getZoom(
					function(zoomFactor) {
						opts.pref_set.zoomFactor =
								zoomFactor;
						resolve();
					}
				);
			}
		)
	);

	Promise.all(promise_set).then(
		function(result) {
			// It shows only bookmarks under
			// the folder "Bookmark Menu".
			add_view(t, bk_tree.root[0].children[0], opts);
		},
		function(error) {
			console.log(`Err: Getting data from browser: ${error}`);
		}
	);

})}}) (jQuery);
