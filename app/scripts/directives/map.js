define([
		'angular',
		'leaflet',
		'jquery'
	],

	function (angular, L, $) {

		'use strict';

		var moduleName = 'map';
		var mapModule = angular.module(moduleName, []);

		mapModule.directive(moduleName, function factory() {
			var directiveDefinitionObject = {
				restrict: 'C',
				replace: false,
				transclude: true,
				link: function postLink(scope, element, attrs) {
					var mapElement = element[0];
					var map = new L.Map(mapElement);

					var landscapeTile = 'http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png';

					//var cycleMapTile = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';

					//var openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


					L.tileLayer(landscapeTile, {
							attribution: '&copy; OpenStreetMap'
					}).addTo(map);


					scope.$watch('trails', function(trails) {

						if(trails) {
							$.each(trails, function(i, trail){
								L.polyline(trail.data, {color: 'red'}).addTo(map);
							});
						}
					});

					scope.$watch('center', function(center) {
						if (center === undefined){return;}

						// Center of the map
						center = new L.LatLng(scope.center[0], scope.center[1]);
						var zoom = scope.zoom || 13;
						map.setView(center, zoom);

					});
				}
			};
			return directiveDefinitionObject;
		});

		return moduleName;
});
