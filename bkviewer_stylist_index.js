(function($) {
$.fn.bkviewer_stylist_index = function() {
return this.each(function() {
	var json;

	var frame_color = "#0ac";
	var bg_color =    "#fff";
	var text_color =  "#00f";
	var zoom = 100;
	var font_size = String(zoom) + "%";
	var favicon_size = String(Math.floor(12 * zoom / 100.0)) + "px";

	/* 2 is 2 * (border width), 15 is the width of scroll bar,
	   1 is because the border width is over 1px and it is
	   at most 1.333...px if the page is zoomed in.
	   The last 10px is space between columns. */
	var columns = 6;
	var spaces = $(window).width() - $("body").innerWidth();
	var availWidth = screen.availWidth - spaces - 15;
	var column_width = Math.floor(availWidth / columns) - 2 - 1 - 10;

	json = {
		"body": {
			"background-color":	bg_color,
			"color":		text_color,
			"font-family": "\"Helvetica Neue\",Helvetica,Arial,sans-serif",
			"font-size": font_size,
		},
		".bv-clearfix:after": {
			"content":	"\".\"",
			"clear":	"both",
			"display":	"block",
			"height":	"0",
			"visibility":	"hidden",
		},
		
		"* html .bv-clearfix": {
			"height":	"1%",
		},
		
		".bv-clearfix": {
			"display":	"block",
		},
		
		"ul.bk-box": {
			"width":         String(column_width) + "px",
			"padding-top":   "0px",
			"padding-left":  "0px",
			"padding-right": "0px",
			"margin-left":   "0px",
			"margin-right":  "0px",
			"border-color":  frame_color,
			"border-width":  "1px",
			"border-style":  "solid",
			"float":         "left",
		},
		
		"li.bk-category": {
			"color":	    bg_color,
			"background-color": frame_color,
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
			"color":	   text_color,
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
