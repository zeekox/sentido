define([
		'angular'
		],

		function(angular ) {

			var moduleName = 'mongolab';

			// This is a module for cloud persistance in mongolab - https://mongolab.com
			angular.module(moduleName, ['ngResource']).
			factory('Trails', ['$resource', function(rsrc) {
				var Trails = rsrc('https://api.mongolab.com/api/1/databases' +
						'/angularjs/collections/projects/:id',
					{ apiKey: '4f847ad3e4b08a2eed5f3b54' }, {
						update: { method: 'PUT' }
					}
						);

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
