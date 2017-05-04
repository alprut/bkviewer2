$(function(){
	function get_config(key, def_value, conf, func) {
		return browser.storage.local.get(key).then(
			function(result) {
				if (result[key]) {
					conf[key] = result.value;
				} else {
					conf[key] = def_value;
				}
			},
			function(error) {
				conf[key] = def_value;
			}
		).then(
			function(result) {
				func(conf);
			}
		);
	}

	function show_theme_config(conf) {
		console.log("show_theme_config");
		console.log(conf);
	}

	function show_frame_color_config(conf) {
	}

	function show_bg_color_config(conf) {
	}

	function show_text_color_config(conf) {
	}

	function show_zoom_config(conf) {
		var selector = $('#zoom')
		var value = conf['zoom'];

		console.log("zoom");

		if (value < 100 || value > 300 || (value % 25) != 0) {
			value = 100;
		}

		value = String(value);

		selector.val(value).change(function() {
			var new_value = $('#zoom option:selected').val();
//			prefs.setIntPref(key, parseInt(new_value));
			console.log("zoom: " + new_value);
		});

		selector.css("font-size", selector.parent().css("font-size"));
	}

	var conf = {};
	get_config("theme", "rounded_box", conf, show_theme_config);
	get_config("frame_color", "#abc", conf, show_frame_color_config);
	get_config("bg_color", "white", conf, show_bg_color_config);
	get_config("text_color", "black", conf, show_text_color_config);
	get_config("zoom", 100, conf, show_zoom_config);
});
