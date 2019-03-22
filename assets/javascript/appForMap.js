window.onload = initMap;
 
var map;
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Oops, no geolocation support");
  }
}

function displayLocation(position) {
  //The latitude and longitude values obtained from HTML 5 API.
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
 
  //Creating a new object for using latitude and longitude values with Google map.
  var latLng = new google.maps.LatLng(latitude, longitude);
 
  showMap(latLng);
 
  addNearByPlaces(latLng);
  createMarker(latLng);
}
 
function showMap(latLng) {
  //Setting up the map options like zoom level, map type.
  var mapOptions = {
    center: latLng,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
 
  //Creating the Map instance and assigning the HTML div element to render it in.
  map = new google.maps.Map(document.getElementById("putMapHere"), mapOptions);
}
 
function addNearByPlaces(latLng) {
 
  var nearByService = new google.maps.places.PlacesService(map);
 
  var request = {
    location: latLng,
    radius: 5000,
    types: ['liquor_store']
  };
 
  nearByService.nearbySearch(request, handleNearBySearchResults);
}
 
function handleNearBySearchResults(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(place.geometry.location, place);
    }
  }
}
 
function createMarker(latLng, placeResult) {
  var markerOptions = {
    position: latLng,
    map: map,
    animation: google.maps.Animation.DROP,
    clickable: true
  }
  //Setting up the marker object to mark the location on the map canvas.
  var marker = new google.maps.Marker(markerOptions);
 
  if (placeResult) {
    var content = placeResult.name+"<br/>"+placeResult.vicinity+"<br/>"+placeResult.types;
    addInfoWindow(marker, latLng, content);
  }
  else {
    var content = "You are here: " + latLng.lat() + ", " + latLng.lng();
    addInfoWindow(marker, latLng, content);
  }
 
}
 
function addInfoWindow(marker, latLng, content) {
  var infoWindowOptions = {
    content: content,
    position: latLng
  };
 
  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
 
  google.maps.event.addListener(marker, "click", function() {
    infoWindow.open(map);
  });
}