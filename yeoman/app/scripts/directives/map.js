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
					var map = new L.Map(mapElement, {attributionControl: true});

					L.control.scale({imperial: false}).addTo(map);

					var landscapeTile = 'http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png';

					//var cycleMapTile = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';

					//var openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


					L.tileLayer(landscapeTile, {
							attribution: '&copy; OpenStreetMap'
					}).addTo(map);

					var cachedLayers = {};
					scope.displayed_trails = 0;
					scope.cached_trails = 0;

					scope.$watch('trails', function(trails) {
					
						scope.displayed_trails = 0;

						if(trails) {
							$.each(trails, function(i, trail){
								var geoJSON = L.geoJson(trail.path, {color: 'blue'});

								scope.displayed_trails = trails.length;

								if(!(trail.id in cachedLayers)) {
									cachedLayers[trail.id] = { trail: trail, layer: geoJSON };
									geoJSON.addTo(map);

									if(!scope.cached_trails){
										scope.cached_trails = 0;
									}

									scope.cached_trails++;
								}
							});
						}
					});

					scope.$watch('selectedTrail', function(selectedTrail, lastSelected) {
						if(lastSelected) {
							cachedLayers[lastSelected].layer.setStyle({color: 'blue'});
						}

						if(selectedTrail) {
							var selectedLayer = cachedLayers[selectedTrail].layer;
							selectedLayer.bringToFront();
							selectedLayer.setStyle({color: 'red'});
	
							var bounds = selectedLayer.getBounds();
							var zoom = map.getBoundsZoom(bounds);

							map.setView(bounds.getCenter(), zoom-2);
						}

					});

					scope.$watch('center', function(center) {
						if (center === undefined){return;}

						// Center of the map
						center =  new L.LatLng(scope.center[1], scope.center[0]);
						var zoom = scope.zoom || 13;
						map.setView(center, zoom);

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
