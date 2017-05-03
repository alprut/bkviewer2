(function($) {
$.fn.bkviewer_index = function(options) {
return this.each(function() {
	var t = $(this), columns;

	function add_box(target, cur_box, item, prev) {
		var box;

		if (cur_box.height() > 500) {
			box = $('<ul />').addClass('bk-box')
					 .appendTo(target);

			if (prev && prev.hasClass('bk-category')) {
				box.append(prev);
			}

			box.append(item);
		} else {
			box = cur_box;
		}

		return box;
	}

	t.show_bookmarks({
		init: function(target, context) {
			context.cur_box = $('<ul />').addClass('bk-box')
						     .appendTo(target);
		},
		add_category_view: function(json, target, context) {
			var box, cur_box = context.cur_box;

			box = $('<li />').text(json['title'])
					 .addClass('bk-category')
					 .appendTo(cur_box);

			context.cur_box = add_box(target, cur_box, box,
						  context.prev);
			context.prev = box;
		},

		add_item_view: function(json, target, context) {
			var box, cur_box = context.cur_box, atag, img;

			box = $('<li />').addClass('bk-item')
					 .appendTo(cur_box);

			atag = $('<a />').text(json['title'])
				  .attr({'href': json['uri']})
				  .addClass('bk-item')
				  .appendTo(box);

			img = $('<img />').addClass('favicon')
					  .attr({'src': json['favicon']})
					  .prependTo(atag);

			context.cur_box = add_box(target, cur_box, box,
						  context.prev);
			context.prev = box;

			return img;
		},

		fini: function(target, context) {
			columns = $('.bk-box');

			columns.css({"height": 500});
			target.addClass('bv-clearfix');

			$(window).resize(function() {
						equal_spacing(t, columns);
			 });

			equal_spacing(t, columns);
		}
	});

	function equal_spacing(box, contents) {
		var box_width, item_width, items_num, margin, first_margin;
		var is_little = false;

		box_width = box.innerWidth() - 1;
		item_width = contents.outerWidth() + 1;

		items_num = Math.floor(box_width / item_width);
		if (items_num > contents.length) {
			items_num = contents.length;
			is_little = true;
		}

		margin = Math.floor((box_width % item_width) / items_num / 2);
		contents.css({"margin-right": margin, "margin-left": margin})

		if (is_little) {
			/* Don't do equal spacing it there is not enough
			   items */
			first_margin = items_num * (2 * margin + item_width);
			first_margin = box_width - first_margin;
			first_margin = Math.floor(margin + first_margin / 2);
			contents.first()
				.css({"margin-right": margin,
				      "margin-left": first_margin});
		}
	}
})}} (jQuery));
