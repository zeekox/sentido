define([
		'angular'
		],

		function(angular) {

			'use strict';

			var moduleName = 'mongolab';

			// This is a module for cloud persistance in mongolab - https://mongolab.com
			angular.module(moduleName, ['ngResource']).
			factory('Trail', ['$resource', function(rsrc) {
					var Trails = rsrc('/trails.js');

					Trails.prototype.update = function(cb) {
						return Trails.update({id: this._id.$oid},
							angular.extend({}, this, {_id:undefined}), cb);
					};

					Trails.prototype.destroy = function(cb) {
						return Trails.remove({id: this._id.$oid}, cb);
					};

					return Trails;
			}]);

			return moduleName;
});
