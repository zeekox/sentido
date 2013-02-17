define([
		'angular',
		'leaflet',
		'jquery'
	],

	function (angular, L, $) {

		'use strict';

		var moduleName = 'map';
		var mapModule = angular.module(moduleName, []);

		mapModule.directive('map', function factory() {
			var directiveDefinitionObject = {
				restrict: 'C',
				replace: false,
				transclude: true,
				scope: {
					center: '=',
					zoom: '='
				},
				link: function postLink(scope, element, attrs) {
					var mapElement = element[0];
					var map = new L.Map(mapElement);

					var landscapeTile = 'http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png';

					//var cycleMapTile = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';

					//var openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


					L.tileLayer(landscapeTile, {
							attribution: '&copy; OpenStreetMap'
					}).addTo(map);

					var ids = ['002','004','005','006','008','009','014','034','071','121','124'];

					var nbrOfCoordinates = 0;


					$.each(ids, function(i, id){
						$.getJSON('json/ch1086.'+id+'.json', function(data) {

							var latlngs = [];

							$.each(data, function(i, latlng) {
								nbrOfCoordinates++;
								latlngs.push(new L.LatLng(latlng.lat, latlng.lng));
							});

							map.setView(latlngs[0], 13);

							L.polyline(latlngs, {color: 'red'}).addTo(map);

							$('<div> ' + nbrOfCoordinates + '</div>').insertAfter('#map');

						});

					});

					scope.$watch('center', function(center) {
						if (center === undefined){return;}

						// Center of the map
						center = new L.LatLng(scope.center.lat, scope.center.lng);
						var zoom = scope.zoom || 8;
						map.setView(center, zoom);

						var marker = new L.marker(scope.center, { draggable: attrs.markcenter ? false:true });
						if (attrs.markcenter || attrs.marker) {
							map.addLayer(marker);

							if (scope.message) {
								marker.bindPopup('<strong>' + scope.message + '</strong>', { closeButton: false });
								marker.openPopup();
							}
							if (attrs.marker) {
								scope.marker.lat = marker.getLatLng().lat;
								scope.marker.lng = marker.getLatLng().lng;
							}
						}

						// Listen for map drags
						var draggingMap = false;
						map.on('dragstart', function() {
							draggingMap = true;
						});

						map.on('drag', function () {
							scope.$apply(function (s) {
								s.center.lat = map.getCenter().lat;
								s.center.lng = map.getCenter().lng;
							});
						});

						map.on('dragend', function() {
							draggingMap= false;
						});

						scope.$watch('center.lng', function (newValue) {
							if (draggingMap){return;}
							map.setView(new L.LatLng(map.getCenter().lat, newValue), map.getZoom());
						});

						scope.$watch('center.lat', function (newValue) {
							if (draggingMap){return;}
							map.setView(new L.LatLng(newValue, map.getCenter().lng), map.getZoom());
						});

						// Listen for zoom
						scope.$watch('zoom', function (newValue) {
							map.setZoom(newValue);
						});

						map.on('zoomend', function () {
							scope.zoom = map.getZoom();
							scope.$apply();
						});

						if (attrs.marker) {

							var draggingMarker = false;

							// Listen for marker drags
							(function () {

									marker.on('dragstart', function() {
										draggingMarker = true;
									});

									marker.on('drag', function () {
										scope.$apply(function (s) {
											s.marker.lat = marker.getLatLng().lat;
											s.marker.lng = marker.getLatLng().lng;
										});
									});

									marker.on('dragend', function() {
										marker.openPopup();
										draggingMarker = false;
									});

									map.on('click', function(e) {
										marker.setLatLng(e.latlng);
										marker.openPopup();
										scope.$apply(function (s) {
											s.marker.lat = marker.getLatLng().lat;
											s.marker.lng = marker.getLatLng().lng;
										});
									});

									scope.$watch('marker.lng', function (newValue) {
										if (draggingMarker){return;}
										marker.setLatLng(new L.LatLng(marker.getLatLng().lat, newValue));
									});

									scope.$watch('marker.lat', function (newValue) {
										if (draggingMarker){return;}
										marker.setLatLng(new L.LatLng(newValue, marker.getLatLng().lng));
									});

							}());

						}

					});
				}
			};
			return directiveDefinitionObject;
		});

		return moduleName;
});
