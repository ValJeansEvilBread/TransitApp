var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 15,
        scrollwheel: false
    });
    
    var infowindow = new google.maps.InfoWindow();
	
    for (i=0; i<busLocations.length; i++){
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(busLocations[i].LATITUDE), lng: parseFloat(busLocations[i].LONGITUDE) },
            map: map,
            icon: "bus.png",
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent("Bus #"+busLocations[i].VEHICLE);
                infowindow.open(map, marker);
            }
        })(marker, i));
        
    }
    
    var addressMarker = new google.maps.Marker({
        position: coords,
        map: map
    });

}


function doGeocode() {
    var address = document.getElementById("address");
    var geoCoder = new google.maps.Geocoder();
    geoCoder.geocode({
        'address': address.value
    }, function(results, status) {
        if (status != google.maps.GeocoderStatus.OK) {
            alert("Invalid address/city.");
        }
    });
};