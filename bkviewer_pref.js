(function($){
$.fn.get_pref =
	function(key, pref_set) {
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

$.fn.save_pref =
	function(key, value, pref_set) {
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

})(jQuery);

