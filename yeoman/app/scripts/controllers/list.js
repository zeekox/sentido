define([
		'angular',
		'jquery',
		'services/geolocation'
	],
	function(angular, $, geolocation) {

		'use strict';

		var ListCtrl = function (scope, route, routeParams, q, Trail) {

scope.center = [7.45766, 47.2557];

			var promise = geolocation.getPosition(scope, q);
			promise.then(function(position) {
				scope.center = [position.longitude, position.latitude];
				scope.position = position;
			},
			function(reason) {
				scope.position = reason;
			});

			scope.$on('selecttrail', function(e, name) {
				scope.selectedTrail = name;
				return true;
			});

			scope.$on('newBounds', function(e, bounds) {

				if(bounds){

					var sw = bounds.getSouthWest();
					var ne = bounds.getNorthEast();

					var box = {sw_lon: sw.lng, sw_lat: sw.lat, ne_lon: ne.lng, ne_lat: ne.lat };

					Trail.query(box, function(result) {
						scope.trails = result;
					});
				}


			});
		};

		ListCtrl.$inject = ['$scope', '$route', '$routeParams', '$q', 'Trail'];

		var EditCtrl = function (scope, location, routeParams) {

			scope.center = routeParams.trailId;
		};

		EditCtrl.$inject = ['$scope', '$location', '$routeParams'];

		return {
			list: ListCtrl,
			edit: EditCtrl
		};
});
