$(function(){
	function get_pref(key, pref_set) {
		return browser.storage.local.get(key).then(
			(function(the_key, the_pref_set) {
				return function(result) {
					if (result[the_key]) {
						the_pref_set[the_key] =
							result[the_key];
					}
				}
			})(key, pref_set),
			function(error) {
				console.log(`error on getting pref: ${error}`);
			}
		);
	}

	function save_pref(key, value, pref_set) {
		var data = {};

		pref_set[key] = value;
		data[key] = value;
		browser.storage.local.set(data).then(
			function(result) {
			},
			function(error) {
				console.log(`error on saving pref: ${error}`);
			}
		);
	}

	var pref_set = {
		"theme":	"rounded_box",
		"frame_color":	"#00aacc",
		"bg_color":	"#ffffff",
		"text_color":	"#0000ff",
		"zoom":		100,

		"columns": 6
	};

	function show_rounded_box_config(pref_set) {
	}

	function remove_rounded_box_config(pref_set) {
	}

	function show_index_config(pref_set) {
		var selector;
		var columns;
		var ptag;

		$("<h2 />").text("Size")
			   .addClass("index_config")
			   .appendTo("body");

		ptag = $("<p />").addClass("index_config")
				 .text("colums in the maximum window")
				 .appendTo("body");

		$("<select />").attr({ "id": "columns", "name": "columns" })
			       .addClass("index_config")
			       .prependTo(ptag);

		selector = $("#columns");
		for (var i = 1; i <= 20; i++) {
			$("<option />").attr("value", String(i))
				       .text(String(i))
				       .appendTo(selector);
		}

		columns = pref_set["columns"];
		selector.val(String(columns));
		selector.change(function() {
			columns = parseInt(selector.val());
			save_pref("columns", columns, pref_set);
		});

		selector.css("font-size", selector.parent().css("font-size"));
	}

	function remove_index_config(pref_set) {
		$(".index_config").remove();
	}

	function show_theme_config(pref_set) {
		var theme_set = {
			"index": {
				"name":	  "Index",
				"show_config":   show_index_config,
				"remove_config": remove_index_config,
			},
		       "rounded_box": {
				"name":		 "Rounded Box",
				"show_config":   show_rounded_box_config,
				"remove_config": remove_rounded_box_config,
			},
		};

		var base ="bkviewer_";
		var theme_list = $(".theme_list");

		for (var id in theme_set) {
			var theme = theme_set[id];
			var tag = $("<li />").addClass("theme")
					     .appendTo(theme_list);
			tag = $("<div />").addClass("theme")
					  .appendTo(tag);
			tag.text(theme["name"]);
			$("<br />").appendTo(tag);

			tag = $("<img />").attr({ "id": id,
						  "src": base + id + ".png"})
					  .addClass("theme")
					  .appendTo(tag);
			tag.click(function() {
				var cur_theme = pref_set["theme"];
				theme_list.find(".checked")
					  .removeClass("checked");
				$(this).addClass("checked");

				theme_set[cur_theme]["remove_config"](pref_set);

				cur_theme = $(this).attr("id");
				theme_set[cur_theme]["show_config"](pref_set);

				save_pref("theme", cur_theme, pref_set);
			});

			if (id == pref_set["theme"]) {
				tag.addClass("checked");
				theme_set[pref_set["theme"]]["show_config"](pref_set);
			}
		}
	}

	function show_color_config(pref_set) {
		var box_set = $(".color_box");

		box_set.each(function() {
			var id = $(this).attr("id");
			var value = pref_set[id];
			$(this).css("background-color", value)
			       .ColorPicker({
				color: value,
				onSubmit: function(hsb, hex, rgb, el) {
					hex = "#" + hex;
					$(el).css("background-color", hex);
					pref_set[$(el).attr("id")] = hex;
					save_pref($(el).attr("id"), hex, pref_set);
				},
				onBeforeShow: function(el) {
					box_set.each(function() {
						if (this != el) {
							$(this).ColorPickerHide();
						}
					});
				},
			});
		});
	}

	function show_zoom_config(pref_set) {
		var value = pref_set["zoom"];
		var selector = $("#zoom")

		if (value < 100 || value > 300 || (value % 25) != 0) {
			value = 100;
		}

		value = String(value);

		selector.val(value).change(function() {
			let new_value = parseInt($("#zoom option:selected").val());
			pref_set["zoom"] = new_value;
			save_pref("zoom", new_value, pref_set);
		});

		selector.css("font-size", selector.parent().css("font-size"));
	}

	function show_config(pref_set) {
		show_theme_config(pref_set);
		show_zoom_config(pref_set);
		show_color_config(pref_set);
	}

	var promise_set = [];

	for (var key in pref_set) {
		promise_set.push(get_pref(key, pref_set));
	}

	Promise.all(promise_set).then(
		function(result_set) {
			show_config(pref_set);
		},
		function(error) {
			console.log(`error on getting prefs: ${error}`);
		}
	);
});
