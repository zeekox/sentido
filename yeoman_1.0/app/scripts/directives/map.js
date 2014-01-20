define([
		'./module',
		'leaflet',
		'jquery'
	],
	function (directives, L, $) {

		'use strict';
		directives.directive('map', [

				function () {

					var startIcon = new L.DivIcon({html: '>'});
					var endIcon = new L.DivIcon({html: 'x'});

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

										scope.displayed_trails = trails.length;

										if(!(trail.id in cachedLayers)) {
											var geoJSON = L.geoJson(trail.path, {color: 'blue'});

											geoJSON.on('click', function(){
												scope.selectedTrail = trail.id;
												scope.$apply();
											});

											//L.marker(getStart(trail), {icon: startIcon }).addTo(map);
											//L.marker(getEnd(trail), {icon: endIcon }).addTo(map);

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

							function getStart (trail) {
								var lonLat = trail.path.coordinates[0];
								return [lonLat[1], lonLat[0]];
							}

							function getEnd (trail) {
								var lonLat = trail.path.coordinates[trail.path.coordinates.length - 1];
								return [lonLat[1], lonLat[0]];
							}

							scope.$watch('selectedTrail', function(selectedTrail, lastSelected) {
								if(lastSelected) {
									cachedLayers[lastSelected].layer.setStyle({color: 'blue'});
								}

								if(selectedTrail) {
									var selectedLayer = cachedLayers[selectedTrail].layer;
									if(selectedLayer){
										selectedLayer.bringToFront();
										selectedLayer.setStyle({color: 'red'});

										var bounds = selectedLayer.getBounds();
										var zoom = map.getBoundsZoom(bounds);

										map.setView(bounds.getCenter(), zoom-2);
									}
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
				}
		]);
	}
);
