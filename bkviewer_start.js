$(function(){
	browser.storage.local.get("theme").then(
		function(result) {
			// Hummm...
			switch (result.theme) {
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
			console.log(`Error on getting theme: ${error}`);
		}
	);
});

