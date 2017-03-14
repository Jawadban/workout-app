
export const coord = [];
export let totalDistanceTravelled = 0;

export const getGeoLocation = function () {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    if (coord.length > 30) {
      return coord;
    }
    var crd = pos.coords;
    //if (crd.length > 0){
    coord.push( {Latitude : crd.latitude,
    Longitude: crd.longitude} )
  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  if (coord[coord.length -2] && coord[coord.length -1]) {
    var distanceBetweenLastTwoPoints = distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude)
    totalDistanceTravelled += (distanceBetweenLastTwoPoints);
    //console.log(totalDistanceTravelled);
    console.log(distanceBetweenLastTwoPoints);
  }
}

function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // miles (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  //if (d>1) {
    return /*Math.round(d)*/ d/1.6;
  //} else if (d<=1) return Math.round(d*1000)+" meters";
  //var milesDistance = d/1.6;
  //return d;
}

// export default { totalDistanceTravelled, getGeoLocation};
