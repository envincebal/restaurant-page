$(document).ready(function(){

	var geolocation = "https://freegeoip.net/json/";
	
	$.ajax({
		url: geolocation,
		dataType: "jsonp"
	}).done(function(data){

		var location = $(".location");
		var temperature = $(".temperature");
		var condition = $(".condition");
		var geoURL = "https://api.darksky.net/forecast/8b01861d3b06ab86ba285ef08d52c88d/";
		var lat = data.latitude;
		var long = data.longitude;
		var yourLocation = geoURL + lat + "," + long;

		location.text(data.city + ", " + data.region_name);

		$.ajax({
			url: yourLocation,
			dataType: "jsonp"
		}).done(function(data2){
			var fahrenheit = data2.currently.temperature;
			var currentCondition = data2.currently.summary;

			temperature.html(parseInt(fahrenheit) + "&deg" + "F");
			condition.html(currentCondition);
		});
	});
});