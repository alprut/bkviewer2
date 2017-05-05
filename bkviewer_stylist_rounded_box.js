(function($) {
$.fn.bkviewer_stylist_rounded_box = function() {
return this.each(function() {
	var json;
	var frame_color = "#0ac";
	var bg_color = "#fff";
	var text_color = "#00f";
	var zoom = 100;
	var font_size = String(zoom) + "%";
	var favicon_size = String(Math.floor(12 * zoom / 100.0)) + "px";

	json = {
		"body": {
			"background-color": bg_color,
			"color": text_color,
			"font-family": "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
			"font-size": font_size,
		},
		".bv-clearfix:after": {
			"content":    "\".\"",
			"clear":      "both",
			"display":    "block",
			"height":     "0",
			"visibility": "hidden",
		},
		
		"* html .bv-clearfix": {
			"height": "1%",
		},
		
		".bv-clearfix": {
			"display": "block",
		},
		
		"ul.bk-category": {
			"padding-top":   "0px",
			"padding-left":  "0px",
			"padding-right": "0px",
			"margin-left":   "0px",
			"margin-right":  "0px",
			"border-color":  frame_color,
			"border-width":  "1px",
			"border-style":  "solid",
			"border-radius": "10px",
		},
		
		"li.bk-category": {
			"color":	    bg_color,
			"background-color": frame_color,
			"text-align":       "center",
			"font-weight":      "bold",
			"list-style-type":  "none",
			"clear":            "left",
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
		},
		
		"li.bk-item": {
			"list-style-type": "none",
			"float":           "left",
			"margin-top":      "2px",
			"margin-bottom":   "2px",
			"padding-left":    "10px",
			"padding-right":   "10px",
		},
		
		"a.bk-item, a.configuration": {
			"text-decoration": "none",
			"color": text_color,
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

		".tclock": {
			"text-align": "center",
			"color":      bg_color,
			"margin-top":  "12px",
		},

		".tclock-time": {
			"font-size": "220%",
		},

		".tclock-date": {
			"font-size": "110%",
		},
	};

	$(this).stylist(json);
		
})}}) (jQuery);
