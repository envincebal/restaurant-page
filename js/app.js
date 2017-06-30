$.getJSON("https://freegeoip.net/json/", function(data){
	
	var location = $(".location");
	var condition = $(".condition");
	var temperature = $(".temperature");
	var change = $(".change");

	var geoURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8b01861d3b06ab86ba285ef08d52c88d/" + data.latitude + "," + data.longitude;;
	var toggle = true;

	$.getJSON(geoURL, function(data2){
    var today = new Date();
    var date = (today.getMonth()+1)+ '/' + today.getDate()  + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
		var fahrenheit = data2.currently.temperature;
		var currentCondition = data2.currently.summary;
		var weatherIcon = data2.currently.icon;
		var skycons = new Skycons({"color":"#fff"});
    
    $(".current-date").html(date);
    location.text(data.city + ", " + data.region_name);
    condition.html(currentCondition);
		skycons.add("icon", weatherIcon);
		skycons.play();
		temperature.html(parseInt(fahrenheit) + "&deg") + change.html("F");

		$(".change").click(function(){
			if (toggle) {
				fahrenheit = (fahrenheit - 32) * 5/9;
				temperature.html(parseInt(fahrenheit) + "&deg") + change.html("C");
				toggle = false;
			} else {
				fahrenheit = fahrenheit * 1.8 + 32;
				temperature.html(parseInt(fahrenheit) + "&deg") + change.html("F");
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


	