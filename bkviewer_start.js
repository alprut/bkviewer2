$(function(){
	var pref_set = {
		"theme":      "rounded_box",
		"bg_color":   "#fff",
		"text_color": "#0ac",
		"zoom":	      100,
	};

	var promise_set = [];

	function body_style(pref_set) {
		var font_size = String(pref_set.zoom) + "%";
	
		json = {
			"body": {
				"background-color": pref_set.bg_color,
				"color": pref_set.text_color,
				"font-size": font_size,
				"font-family": '"Helvetica Neue",' +
					       "Helvetica,Arial,sans-serif",
			}
		};

		$().wear(json);
	}

	for (var key in pref_set) {
		promise_set.push($().get_pref(key, pref_set));
	}

	Promise.all(promise_set).then(
		function(result) {

			body_style(pref_set);

			// Hummm...
			switch (pref_set.theme) {
			case "index":
				$(".bkviewer").bkviewer_index();
				break;
			case "rounded_box":
			default:
				$(".bkviewer").bkviewer_rounded_box();
				break;
			}
		},
		function(error) {
			console.log(`Err: Getting preferences: ${error}`);
		}
	);
});

