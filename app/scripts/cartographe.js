define([
  'leaflet',
  'jquery'
],

function(L, $) {

	'use strict';
	
	var map = L.map('map');

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




	var landscapeTile = 'http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png';

	//var cycleMapTile = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png';

	//var openstreetmap = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';


	L.tileLayer(landscapeTile, {
		attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);
	
});
