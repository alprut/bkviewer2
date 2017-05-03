function open_bkviewer() {
	browser.tabs.create({
		"url": "/bkviewer.html"
	});
}

browser.browserAction.onClicked.addListener(open_bkviewer);
 
