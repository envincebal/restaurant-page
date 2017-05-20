$(document).ready(function(){

	var geolocation = "https://freegeoip.net/json/";
	
	$.ajax({
		url: geolocation,
		dataType: "jsonp"
	}).done(function(data){

		var location = $(".location");
		var temperature = $(".temperature");
		var icon = $(".icon");
		var condition = $(".condition");
		var button = $(".change");
		var geoURL = "https://api.darksky.net/forecast/8b01861d3b06ab86ba285ef08d52c88d/";
		var lat = data.latitude;
		var long = data.longitude;
		var yourLocation = geoURL + lat + "," + long;
		var toggle = true;

		location.html(data.city + ", " + data.region_name);

		$.ajax({
			url: yourLocation,
			dataType: "jsonp"
		}).done(function(data2){
			var fahrenheit = data2.currently.temperature;
			var currentCondition = data2.currently.summary;
			var weatherIcon = data2.currently.icon;

			temperature.html(parseInt(fahrenheit) + "&deg" + "F");
			icon.attr("src", setImage(weatherIcon));
			condition.html(currentCondition);

			button.click(function(){
				if (toggle) {
					fahrenheit = (fahrenheit - 32) * 5/9;
					temperature.html(parseInt(fahrenheit) + "&deg" + "C");
					toggle = false;
				} else {
					fahrenheit = fahrenheit * 1.8 + 32;
					temperature.html(parseInt(fahrenheit) + "&deg" + "F");
					toggle = true;
				}
			});
		});
	});

	function setImage(param) {
		switch(param) {
			case "clear-day": 
				return "img/clear-day.png";
				break;
			case "clear-night": 
				return "img/clear-night.png";
				break;
			case "rain": 
				return "img/rain.png";
				break;
			case "snow": 
				return "img/snow.png";
				break;
			case "sleet": 
				return "img/sleet.png";
				break;
			case "wind": 
				return "img/wind.png";
				break;
			case "fog": 
				return "img/fog.png";
				break;
			case "cloudy":
				return "img/cloudy.png";
				break;
			case "partly-cloudy-day":
				return "img/partly-cloudy-day.png";
				break;
			case "partly-cloudy-night":
				return "img/partly-cloudy-night.png";	
				break;
		}
	}
});