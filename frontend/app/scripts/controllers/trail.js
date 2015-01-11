define([
		'./module',
		'services/geolocation'
	],
	function (controllers, geolocation) {
		'use strict';
		controllers.controller('TrailCtrl', ['$scope','$q', 'trail', function ($scope, q, Trail) {
				
				$scope.center = [7.353011682782,47.283851153176];
				if(q){
					var promise = geolocation.getPosition($scope, q);
					promise.then(function(position) {
						$scope.center = [position.longitude, position.latitude];
						$scope.position = position;
					},
					function(reason) {
						$scope.position = reason;
					});
				}

				$scope.trail_info = function(){
					var trail = $scope.selectedTrail;
					var info = '';
					if(!trail){
						return info;
					}
					if(trail.length){
						info += trail.length + ', ';
					}
					if(trail.diff){
						info += trail.diff + ', ';
					}
					if(trail.state){
						info += 'état: ' + trail.state + ', ';
					}
					if(trail.date){
						info += trail.date;
					}
					return info;
				};

				$scope.$on('newBounds', function(e, bounds) {
					if(bounds){
						var sw = bounds.getSouthWest();
						var ne = bounds.getNorthEast();
						var box = {sw_lon: sw.lng, sw_lat: sw.lat, ne_lon: ne.lng, ne_lat: ne.lat };
						if(Trail){
							Trail.query(box, function(result) {
								$scope.trails = result;
							});
						}
					}
				});
		}]);
});
