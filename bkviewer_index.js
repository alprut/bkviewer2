(function($) {
$.fn.bkviewer_index = function(options) {
return this.each(function() {
	var t = $(this), columns;

	function add_box(target, cur_box, item, prev) {
		var box;

		if (cur_box.height() > 500) {
			box = $("<ul />").addClass("bk-box")
					 .appendTo(target);

			if (prev && prev.hasClass("bk-category")) {
				box.append(prev);
			}

			box.append(item);
		} else {
			box = cur_box;
		}

		return box;
	}

	function dress(pref_set) {
		var json;
	
		var font_size = String(pref_set.zoom) + "%";
		var favicon_size = String(Math.floor(
						12 * pref_set.zoom / 100.0)
					 ) + "px";
	
		/* 2 is 2 * (border width), 15 is the width of scroll bar,
		   1 is because the border width is over 1px and it is
		   at most 1.333...px if the page is zoomed in.
		   The last 10px is space between columns. */
		var spaces = $(window).width() - $("body").innerWidth();
		var availWidth = screen.availWidth - spaces - 15;
		var column_width = Math.floor(availWidth / pref_set.columns) - 2 - 1 - 10;
	
		json = {
			"body": {
				"background-color":	pref_set.bg_color,
				"color":		pref_set.text_color,
				"font-family": "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
				"font-size": font_size,
			},

			".bkviewer": {
				"display":	   "flex",
				"flex-wrap":	   "wrap",
				"justify-content": "space-between",
			},

			"ul.bk-box": {
				"width":         String(column_width) + "px",
				"padding-top":   "0px",
				"padding-left":  "0px",
				"padding-right": "0px",
				"margin-left":   "0px",
				"margin-right":  "0px",
				"border-color":  pref_set.frame_color,
				"border-width":  "1px",
				"border-style":  "solid",
			},
			
			"li.bk-category": {
				"color":	    pref_set.bg_color,
				"background-color": pref_set.frame_color,
				"text-align":       "center",
				"font-weight":      "bold",
				"list-style-type":  "none",
				"line-height":      "1.7em",
			},
			
			"li.bk-item": {
				"list-style-type": "none",
				"padding-left":    "5px",
				"line-height":     "1.7em",
			},
			
			"a.bk-item, a.configuration": {
				"text-decoration": "none",
				"color":	   pref_set.text_color,
			},
			
			"img.favicon": {
				"width":          favicon_size,
				"height":	  favicon_size,
				"margin":	  "0px 5px 0px 0px",
				"padding":	  "0px 0px 0px 0px",
			},
	
			"p.configuration": {
				"text-align": "right",
			},
	
			".tclock": {
				"text-align": "center",
				"color":      pref_set.bg_color,
				"margin-top":  "12px",
			},
	
			".tclock-time": {
				"font-size": "220%",
			},
	
			".tclock-date": {
				"font-size": "110%",
			},
		};

		return json;
	}

	t.show_bookmarks({
		init: function(target, pref_set, context) {
			context.cur_box = $("<ul />").addClass("bk-box")
						     .appendTo(target);
		},
		add_category_view: function(json, target, pref_set, context) {
			var box, cur_box = context.cur_box;

			box = $("<li />").text(json["title"])
					 .addClass("bk-category")
					 .appendTo(cur_box);

			context.cur_box = add_box(target, cur_box, box,
						  context.prev);
			context.prev = box;
		},

		add_item_view: function(json, target, pref_set, context) {
			var box, cur_box = context.cur_box, atag, img;

			box = $("<li />").addClass("bk-item")
					 .appendTo(cur_box);

			atag = $("<a />").text(json["title"])
				  .attr({"href": json["uri"]})
				  .addClass("bk-item")
				  .appendTo(box);

			img = $("<img />").addClass("favicon")
					  .attr({"src": json["favicon"]})
					  .prependTo(atag);

			context.cur_box = add_box(target, cur_box, box,
						  context.prev);
			context.prev = box;

			return img;
		},

		fini: function(target, pref_set, context) {
			columns = $(".bk-box");

			columns.css({"height": 500});
		},

		pref_set: {
			"frame_color":  "#00aacc",
			"bg_color":     "#ffffff",
			"text_color":   "#0000ff",
			"zoom":         100,
			"columns":	6
        	},

		dress: dress
	});
})}}) (jQuery);
