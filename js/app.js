$(document).ready(function(){
	
	$.getJSON("https://freegeoip.net/json/", function(data){
		var location = $(".location");
		location.text(data.city + ", " + data.region_name);

	});
});

