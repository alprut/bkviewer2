function open_bkviewer() {
	chrome.tabs.create({
		"url": "/bkviewer.html"
	});
}

chrome.browserAction.onClicked.addListener(open_bkviewer);
 
