var map;
var geocoder;
function init(){
	document.addEventListener("deviceready", onDeviceReady, false)
}
function onDeviceReady(){
	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
}
function onOffline(){
	alert("Not connected to the Internet");
	var mapObj = document.getElementById("myMap");
	mapObj.innerHTML = "Please connect to the Internet";
}
function onOnline(){
	var myscript = document.createElement("script");
	myscript.type = "text/javascript";
	myscript.src = "https://maps.googleapis.com/maps/api/js?callback=initMap";
	document.body.appendChild(myscript);
}
function initMap() {
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		center: new google.maps.LatLng(13.668316, 100.464024),
		zoom: 15
	};			
	var mapObj = document.getElementById("myMap");
	map = new google.maps.Map(mapObj, mapOptions);	
}
function search(){
	var address = document.getElementById("address").value;
	geocoder.geocode({'address': address}, resultSearch);
}
function resultSearch(results, status){
	if(status == google.maps.GeocoderStatus.OK){
		map.setCenter(results[0].geometry.location);
		map.setZoom(15);
		for (var i = 0; i < results.length; i++){
			var marker = new google.maps.Marker({
				map: map, 
				position: results[i].geometry.location
			});
		}
	}
	else{alert("Geocode error: " + status)}
}