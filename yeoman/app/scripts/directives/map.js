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

						if(!scope.polylines){
							scope.polylines = {};
						}

						if(trails) {
							$.each(trails, function(i, trail){
								scope.polylines[trail.name] = L.polyline(trail.data, {color: 'blue'}).addTo(map);
							});
						}
					});

					scope.$watch('selectedTrail', function(selectedTrail, lastSelected) {
						if(lastSelected) {
							scope.polylines[lastSelected].setStyle({color: 'blue'});
						}

						if(selectedTrail) {
							var selectedPolyline = scope.polylines[selectedTrail];
							selectedPolyline.bringToFront();
							selectedPolyline.setStyle({color: 'red'});
						}
					});

					scope.$watch('center', function(center) {
						if (center === undefined){return;}

						// Center of the map
						center = new L.LatLng(scope.center[0], scope.center[1]);
						var zoom = scope.zoom || 13;
						map.setView(center, zoom);

						L.marker(center).addTo(map);

					});
				}
			};
			return directiveDefinitionObject;
		});

		return moduleName;
});
