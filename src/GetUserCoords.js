import coord from './App.js'
import totalDistanceTravelled from './App.js'
import distance from './App.js'

var coord = [];
var totalDistanceTravelled = 0;

export default function getGeoLocation () {
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
    Longitude: crd.longitude} );

  };

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  // if (coord.length) {
  //   console.log(coord); 
  // }

  if (coord[coord.length -2] && coord[coord.length -1]) {
    var distanceBetweenLastTwoPoints = distance(/*37.7632954, -122.4857721,*/ coord[coord.length -2].Latitude, coord[coord.length -2].Longitude, coord[coord.length -1].Latitude, coord[coord.length -1].Longitude)
    totalDistanceTravelled += (distanceBetweenLastTwoPoints);
    //console.log(totalDistanceTravelled);
    console.log(distanceBetweenLastTwoPoints);
  }

}
