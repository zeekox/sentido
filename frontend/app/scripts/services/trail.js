define([
		'./module'
		],

		function(services) {

			'use strict';

			services.factory('trail', ['$resource', function(rsrc) {
					return rsrc('/trails/around/:sw_lon/:sw_lat/:ne_lon/:ne_lat.js',
						{sw_lon: '@sw_lon', sw_lat: '@sw_lat',
							ne_lon: '@ne_lon', ne_lat: '@ne_lat'}
					);
			}]);

});
