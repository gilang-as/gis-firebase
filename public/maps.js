// Get a reference to the database service
var db = firebase.database();
var a;
var latitude = firebase.database().ref('pengaturan');
latitude.on('value', showData, showError);
function showData(items){
	var data = items.val();
	var lat = parseFloat(data.latitude);
	var lng = parseFloat(data.longitude);
	var zoom = parseFloat(data.zoom);
	var latlng = {lat : lat, lng: lng };
	console.log(latlng);
	initMap(latlng, zoom);
}
function showError(err){
	console.log(err.val()); 
}

function initMap(latlng, zoom) {
	var map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: zoom
    });
	
	
	var marker = new google.maps.Marker({
    position:  { lat: -6.7976299, lng: 110.7278918 },
    map: map,
	icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
	draggable: false,
    animation: google.maps.Animation.DROP,
    title: 'Hello World!'
	});
	marker.setMap(map);
	marker.addListener('click', toggleBounce);
	function toggleBounce() {
	  if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	  } else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	  }
	}
}