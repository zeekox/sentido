define(["./module","services/geolocation"],function(a,b){"use strict";a.controller("TrailCtrl",["$scope","$q","trail",function(a,c,d){if(a.center=[7.353011682782,47.283851153176],c){var e=b.getPosition(a,c);e.then(function(b){a.center=[b.longitude,b.latitude],a.position=b},function(b){a.position=b})}a.trail_info=function(){var b=a.selectedTrail,c="";return b?(b.length&&(c+=b.length+", "),b.diff&&(c+=b.diff+", "),b.state&&(c+="état: "+b.state+", "),b.date&&(c+=b.date),c):c},a.$on("newBounds",function(b,c){if(c){var e=c.getSouthWest(),f=c.getNorthEast(),g={sw_lon:e.lng,sw_lat:e.lat,ne_lon:f.lng,ne_lat:f.lat};d&&d.query(g,function(b){a.trails=b})}})}])});