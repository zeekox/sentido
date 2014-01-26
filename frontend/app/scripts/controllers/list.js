define([
		'./module',
		'services/geolocation'
	],
	function (controllers, geolocation) {
		'use strict';
		controllers.controller('ListCtrl', ['$scope','$q', 'trail', function ($scope, q, Trail) {

				// ensure center set
				$scope.center = [7.45766, 47.2557];

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

				$scope.$on('selecttrail', function(e, id) {
					$scope.selectedTrail = id;
					return true;
				});

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
