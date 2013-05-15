define([
		'angular',
		'jquery',
		'services/geolocation'
	],
	function(angular, $, geolocation) {

		'use strict';

		var ListCtrl = function (scope, route, routeParams, q, Trail) {

			var test = Trail.query({lat: 7.37180 , lon: 47.285 });

			console.log(test);

			scope.trails = test;

			if(!scope.center){
				scope.center = test[0];
			}
			scope.$apply();

			var trailsIds = ['002','004','005','006','008','009','014','034','071','121','124'];

			var promise = geolocation.getPosition(scope, q);
			promise.then(function(position) {
				scope.center = [position.latitude, position.longitude];
				scope.position = position;
			},
			function(reason) {
				scope.position = reason;
			});

			if(false && !scope.trails){
				var trails = [];

				$.each(trailsIds, function(i, id){
					$.getJSON('json/ch1086.'+id+'.json', function(data) {

						var trail = [];

						$.each(data, function(i, latlng) {
							scope.nbrOfCoordinates++;
							trail.push([latlng.lat, latlng.lng]);
						});


						trails.push({ name: id, startOfTrail: trail[0], data: trail});

						if(trailsIds.length - 1 === i){
							scope.trails = trails;
							if(!scope.center){
								scope.center = trail[0];
							}
							scope.$apply();
						}
					});

				});

			}
			scope.$on('selecttrail', function(event, name, startOfTrail) {
				scope.center = startOfTrail;
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
