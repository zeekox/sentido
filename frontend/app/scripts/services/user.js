define([
		'./module'
		],

		function(services) {
			'use strict';
			services.factory('user', ['$resource', function(rsrc) {
					return rsrc('/user');
			}]);
});
