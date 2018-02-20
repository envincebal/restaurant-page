// This function formats Date object into current date, year and time
const timeConverter = (unix) => {
	const date2 = new Date(unix * 1000);
	let hours = date2.getHours();
	let minutes = ("0" + date2.getMinutes()).slice(-2);

	if (hours >= 12) {
		hours = hours - 12;
		minutes = minutes + " pm";
	} else {
		hours = hours;
		minutes = minutes + " am";
	}
	let formatTime = hours + ":" + minutes;

	return formatTime;
}

// This AJAX call gets the user's current location
$.ajax({
	type: "GET",
	url: "https://freegeoip.net/json/",
	success: (data) => {
		const geoURL = "https://api.darksky.net/forecast/8b01861d3b06ab86ba285ef08d52c88d/" + data.latitude + "," + data.longitude;
		const change = $(".change");

		// This call adds the user's latitude and longitude to the Dark Sky's API endpoint
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: geoURL,
			success:  (data2) => {

				// This appends the current Date and time onto the top of application
				const today = new Date();
				const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

				$(".current-date").text(date);
				$(".location").text(data.city + ", " + data.region_name);
				$(".condition").text(data2.currently.summary);

				// Creates and animates weather icon based on current weather conditions
				const skycons = new Skycons({
					"color": "#fff"
				});

				skycons.add("icon", data2.currently.icon);
				skycons.play();

				let fahrenheit = data2.currently.temperature;
				let temperature = $(".temperature");
				temperature.text(parseInt(fahrenheit) + "°") + change.text("F");
				let toggle = true;

				// This event listener toggles between fahrenheit and celsius of temperature
				$(".change").click(function () {
					if (toggle) {
						fahrenheit = (fahrenheit - 32) * 5 / 9;
						temperature.text(parseInt(fahrenheit) + "°") + change.text("C");
						toggle = false;
					} else {
						fahrenheit = fahrenheit * 1.8 + 32;
						temperature.text(parseInt(fahrenheit) + "°") + change.text("F");
						toggle = true;
					}
				});

				$(".rain-chance").text(data2.currently.precipProbability + " %");
				$(".humidity").text(data2.currently.humidity + " %");
				$(".wind-speed").text(data2.currently.windSpeed + " mph");
				$(".sunrise").text(timeConverter(data2.daily.data[0].sunriseTime));
				$(".sunset").text(timeConverter(data2.daily.data[0].sunsetTime));
			}
		});
	}
});
