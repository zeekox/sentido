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

					var cachedLayers = {};


					scope.$watch('trails', function(trails) {

						if(!cachedLayers){
							cachedLayers = {};
						}

						if(trails) {
							$.each(trails, function(i, trail){
								var geoJSON = L.geoJson(trail.path, {color: 'blue',
										onEachFeature: function (feature, layer) {
											if(!scope.center) {
												scope.center = feature.coordinates[0];
											}
								}});

								if(!(trail.id in cachedLayers)) {
									cachedLayers[trail.id] = geoJSON;
									geoJSON.addTo(map);
									//console.log(Object.keys(cachedLayers).length);
								}
							});
						}
					});

					scope.$watch('selectedTrail', function(selectedTrail, lastSelected) {
						if(lastSelected) {
							cachedLayers[lastSelected].setStyle({color: 'blue'});
						}

						if(selectedTrail) {
							var selectedPolyline = cachedLayers[selectedTrail];
							selectedPolyline.bringToFront();
							selectedPolyline.setStyle({color: 'red'});
						}
					});

					scope.$watch('center', function(center) {
						if (center === undefined){return;}

						// Center of the map
						center =  new L.LatLng(scope.center[1], scope.center[0]);
						var zoom = scope.zoom || 13;
						map.setView(center, zoom);

						L.marker(center).addTo(map);

					});

					map.on('move', function() {
						scope.$emit('newBounds', map.getBounds());
					});
				}
			};
			return directiveDefinitionObject;
		});

		return moduleName;
});
