define([
		'angular'
		],

		function(angular) {

			'use strict';

			var moduleName = 'trailService';

			angular.module(moduleName, ['ngResource']).
			factory('Trail', ['$resource', function(rsrc) {
					return rsrc('/trails/around/:lat/:lon.js', {lat: '@lat', id: '@lon'});
			}]);

			return moduleName;
});
