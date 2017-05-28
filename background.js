(function() {
	var pref_set = {
		"newtab": "off"
	};

	function open_bkviewer() {
		chrome.tabs.create({
			"url": "/bkviewer.html"
		});
	}

	function load_bkviewer(tabid, info, tab) {
		if (tab.status == "complete" &&
		    tab.url == "chrome://newtab/" &&
		    pref_set != undefined &&
		    pref_set.newtab == "on") {
			chrome.tabs.update(tabid, {
				"url": "/bkviewer.html"
			});
		}
	}

	chrome.storage.local.get("newtab", function(new_pref_set) {
		console.log("initial newtab");
		console.log(new_pref_set);
		if (new_pref_set && new_pref_set.newtab) {
			pref_set.newtab = new_pref_set.newtab;
		}
	});

	chrome.storage.onChanged.addListener(function(changes) {
		console.log("changed strage");
		console.log(changes);
		if (changes && changes.newtab) {
			console.log("changed newtab value");
			pref_set.newtab = changes.newtab.newValue;
		}
	});

	chrome.tabs.onUpdated.addListener(load_bkviewer);
	chrome.browserAction.onClicked.addListener(open_bkviewer);
})();
