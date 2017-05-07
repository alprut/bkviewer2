$(function(){
	browser.storage.local.get("theme").then(
		function(result) {
			// Hummm...
			switch (result.theme) {
			case "rounded_box":
				$(".bkviewer").bkviewer_rounded_box();
				break;
			case "index":
				$(".bkviewer").bkviewer_index();
				break;
			default:
				console.log(`Unknown theme: ${result}`);
				break;
			}
		},
		function(error) {
			console.log(`Error on getting theme: ${error}`);
		}
	);
});

