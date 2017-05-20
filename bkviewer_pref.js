(function($){
$.fn.get_pref = function(key, pref_set) {
	return new Promise(function(resolve, reject) {
		chrome.storage.local.get(
			(function(the_key, the_pref_set) {
				return function(result) {
					if (result[the_key]) {
						the_pref_set[the_key] =
							result[the_key];
					}

					resolve();
				}
			})(key, pref_set)
		);
	});
}

$.fn.save_pref =
	function(key, value, pref_set) {
		var data = {};

		pref_set[key] = value;
		data[key] = value;
		chrome.storage.local.set(data);
	}

})(jQuery);

