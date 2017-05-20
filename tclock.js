/* ===========================================================================
 * Tclock: Tiny digital clock with 1 minute granularity.
 *
 * Author: Yasuyuki Kozakai
 * License: MIT license
 * ===========================================================================
 */
(function($) {
$.fn.tclock = function(options) {
	function wear(dress) {
		var style = "";

		for (var i in dress) {
			style += i + " {\n";
			for (var j in dress[i]) {
				style += "\t" + j + ":" + dress[i][j] + ";\n";
			}
			style += "}\n";
		}

		$("style").text($("style").text() + style);
	}

	function tclock_update(alarm, targetTime, targetDate) {
		function twoDigits(num) {
			return String("00" + num).slice(-2);
		}

		if (alarm.name != "tclock_alarm") {
			return;
		}

		var now     = new Date();
		var year    = now.getFullYear();
		var month   = now.getMonth();
		var date    = now.getDate();
		var day     = now.getDay();
		var hours   = now.getHours();
		var minutes = now.getMinutes();

		var month_str = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
				  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

		var week_str = [ "Sun", "Mon", "Tue", "Wed",
				 "Thu", "Fri", "Sat" ];

		var time_str = twoDigits(hours) + ":" +
			       twoDigits(minutes);

		var date_str = week_str[day] + ", " +
			       month_str[month] + " " +
			       twoDigits(date) + ", " +
			       year;

		targetTime.html(time_str);
		targetDate.html(date_str);
	}

	var defaults = { "color": "#0ac"};
	var opts = $.extend({}, defaults, options);

	wear({
		".tclock": {
			"text-align": "center",
			"color":      opts.color,
			"margin-top": "12px",
		},

		".tclock-time": {
			"font-size": "220%",
		},

		".tclock-date": {
			"font-size": "110%",
		},
	});

	var ret = this.each(function() {
		var target = $(this);
		var targetTime = target.find('.tclock-time');
		var targetDate = target.find('.tclock-date');

		targetTime.css("color", opts["color"]);
		targetDate.css("color", opts["color"]);

		tclock_update({ name: "tclock_alarm" }, targetTime, targetDate);
		chrome.alarms.onAlarm.addListener(
			(function(ttime, tdate) {
				return function(alarm) {
					tclock_update(alarm, ttime, tdate);
				}
			})(targetTime, targetDate)
		);
	});

	const delayInMinutes = 1;
	const periodInMinutes = 1;

	chrome.alarms.create("tclock_alarm",
			      {delayInMinutes, periodInMinutes} );

	return ret;

}}) (jQuery);
