(function($) {
$.fn.bkviewer_rounded_box = function(options) {
return this.each(function() {
	var t = $(this);
	var hiddens = new Object();

	var get_pref = $().get_pref;
	var save_pref = $().save_pref;

	function remove_item(hiddens, i) {
		var items = hiddens.items, head, tail;

		head = items.slice(0, i);
		tail = items.slice(i+1, items.length);
		hiddens.items = head.concat(tail);
	}

	function update_hiddens(box, title, hiddens) {
		var i = hiddens.items.indexOf(title);
		var pref_set = {};

		if (box.css("display") == "none") {
			if (i == -1)
				hiddens.items.push(title);
		} else {
			if (i != -1)
				remove_item(hiddens, i);
		}

		save_pref("hiddens", JSON.stringify(hiddens.items), pref_set);
	}

	function toggle(box, hiddens) {
		var title = box.prev();
		if (box.css("display") != "none") {
			title.animate({"border-bottom-left-radius": 8,
				       "border-bottom-right-radius": 8}, 400);
		} else {
			title.css("border-radius", "8px 8px 0px 0px");
		}
		box.slideToggle(function() {
			var ul = $(this);
			update_hiddens(ul, ul.prev().text(), hiddens);
		});
	}

	function hide_categories(target, hiddens) {
		/* Users may change titles, so this synchronize
		 * the preferences with the actual titles.
		 */
		var new_hiddens = [];
		var i, box, title;
		var pref_set = {};

		target.children().each(function() {
			box = $(this);
			title = box.children("li").text();
			i = hiddens.items.indexOf(title);
			if (i != -1) {
				box.children("li").css("border-radius", "8px");
				box.children("ul").hide();
				new_hiddens.push(title);
			}
		});

		hiddens.items = new_hiddens;
		save_pref("hiddens", JSON.stringify(hiddens.items), pref_set);
	}

	function align_width(contents) {
		var item_width = 0;

		contents.width("")
			.each(function() {
			if (item_width < $(this).width()) {
				item_width = $(this).width();
			}
		});

		contents.width(item_width + 1);
	}

	function dress(pref_set) {
		var json;
		var favicon_size = String(Math.floor(
						12 * pref_set.zoom / 100.0)
					 ) + "px";
	
		json = {
			"ul.bk-category": {
				"padding-top":   "0px",
				"padding-left":  "0px",
				"padding-right": "0px",
				"margin-left":   "0px",
				"margin-right":  "0px",
				"border-color":  pref_set.frame_color,
				"border-width":  "1px",
				"border-style":  "solid",
				"border-radius": "10px",
			},
			
			"li.bk-category": {
				"color":	    pref_set.bg_color,
				"background-color": pref_set.frame_color,
				"text-align":       "center",
				"font-weight":      "bold",
				"list-style-type":  "none",
				"margin-top":       "0px",
				"border-radius":    "8px 8px 0px 0px",
			},
			"li.bk-category:hover": {
				"cursor": "pointer",
			},
			
			"ul.bk-item": {
				"padding":       "3px 0px",
				"margin-left":   "0px",
				"margin-right":  "0px",
				"display":	 "flex",
				"flex-wrap":	 "wrap",
				"justify-content": "space-between",
			},
			
			"li.bk-item": {
				"list-style-type": "none",
				"margin-top":      "2px",
				"margin-bottom":   "2px",
				"padding-left":    "10px",
				"padding-right":   "10px",
			},
			"li.dummy": {
				"list-style-type": "none",
				"margin-top":      "0",
				"margin-bottom":   "0",
				"padding-left":    "10px",
				"padding-right":   "10px",
			},


			"a.bk-item, a.configuration": {
				"text-decoration": "none",
				"color": pref_set.text_color,
			},
			
			"img.favicon": {
				"width":   favicon_size,
				"height":  favicon_size,
				"margin":  "0 5px 0 0",
				"padding": "0px 0px 0px 0px",
			},
	
			"p.configuration": {
				"text-align": "right",
			},
		};

		return json;
	}

	t.show_bookmarks({
		add_category_view: function(json, target, pref_set, context) {
			var result, box = target;

			box = $("<ul />").addClass("bk-category")
					 .appendTo(box);

			$("<li />").text(json["title"])
				   .addClass("bk-category")
				   .appendTo(box)
				   .click(function() {
					toggle($(this).next(), hiddens);
				   });

			box = $("<ul />").addClass("bk-item")
					 .appendTo(box);

			context.cur_box = box;
		},

		add_item_view: function(json, target, pref_set, context) {
			var box = context.cur_box, atag, img;
			var default_height;

			box = $("<li />").addClass("bk-item")
					 .appendTo(box);

			atag = $("<a />").text(json["title"])
				  .attr({"href": json["uri"]})
				  .addClass("bk-item")
				  .appendTo(box);

			img = $("<img />").addClass("favicon")
				    .attr({"src": json["favicon"]})
				    .prependTo(atag);

			return img;
		},

		fini: function(target, pref_set, context) {
			target.children().children("ul").each(function() {
				var ul = $(this);

				/* Tips to fix the last row layout */
				for (var i = 0; i < 10; i ++) {
					$("<li />").addClass('dummy')
						   .appendTo(ul);
				}

				align_width(ul.children());

			});

			hiddens.items = JSON.parse(pref_set.hiddens);
			hide_categories(target, hiddens);
		},

		pref_set: {
			"hiddens": "[]",
			"frame_color":	"#00aacc",
			"bg_color":	"#ffffff",
			"text_color":	"#0000ff",
			"zoom":		100
		},

		dress: dress
	});

})}}) (jQuery);
