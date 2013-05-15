define([
		'angular',
		'jquery',
		'services/geolocation'
	],
	function(angular, $, geolocation) {

		'use strict';

		var ListCtrl = function (scope, route, routeParams, q, Trail) {

			Trail.query({lat: 7.37180 , lon: 47.285 }, function(result) {
				scope.trails = result;

				scope.$apply();
			});

			var promise = geolocation.getPosition(scope, q);
			promise.then(function(position) {
				scope.center = [position.latitude, position.longitude];
				scope.position = position;
			},
			function(reason) {
				scope.position = reason;
			});


			scope.$on('selecttrail', function(event, name) {
				scope.selectedTrail = name;
				scope.$apply();
				return true;
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
