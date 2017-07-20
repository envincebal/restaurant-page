$.ajax({
  type: "GET",
  url: "https://freegeoip.net/json/",
  success: function(data){
	
	var geoURL = "https://api.darksky.net/forecast/8b01861d3b06ab86ba285ef08d52c88d/" + data.latitude + "," + data.longitude;
  var change = $(".change");

	$.ajax({
  type: "GET",
  dataType: "jsonp",
  url: geoURL,
  success: function(data2){
		
    var today = new Date();
    var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    
    $(".current-date").text(date);
    $(".location").text(data.city + ", " + data.region_name);
    $(".condition").text(data2.currently.summary);
    
    var skycons = new Skycons({"color":"#fff"});
    
		skycons.add("icon", data2.currently.icon);
		skycons.play();
    
    var fahrenheit = data2.currently.temperature;
    var temperature = $(".temperature");
		temperature.text(parseInt(fahrenheit) + "°") + change.text("F");
    var toggle = true;
    
		$(".change").click(function(){
		 	if (toggle) {
				fahrenheit = (fahrenheit - 32) * 5/9;
				temperature.text(parseInt(fahrenheit) + "°") + change.text("C");
				toggle = false;
			} else {
				fahrenheit = fahrenheit * 1.8 + 32;
				temperature.text(parseInt(fahrenheit) + "°") + change.text("F");
				toggle = true;
			}
		});
    
    $(".rain-chance").text( data2.currently.precipProbability + " %");
    $(".humidity").text(data2.currently.humidity + " %");
    $(".wind-speed").text(data2.currently.windSpeed + " mph");
    $(".sunrise").text(timeConverter(data2.daily.data[0].sunriseTime));
    $(".sunset").text(timeConverter(data2.daily.data[0].sunsetTime));
	}
  });
	}
  });
function timeConverter(unix){
  var date2 = new Date(unix * 1000);
  var hours = date2.getHours();
  var minutes = ("0" + date2.getMinutes()).slice(-2);
    
  if (hours >= 12) {
    hours = hours - 12;
    minutes = minutes + " pm";
  }else{
    hours = hours;
    minutes = minutes + " am";
  }
  var formatTime = hours + ":" + minutes;
  
  return formatTime;
}


	