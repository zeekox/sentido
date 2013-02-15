define([
		'angular'
	],

	function(angular) {


		var ListCtrl = function (scope, Trails) {
			scope.projects = Trails.query();
		};

		ListCtrl.$inject = ['$scope', 'Trails'];

		var EditCtrl = function (scope, location, routeParams, Trails) {
			var self = this;

			Trails.get({id: routeParams.projectId}, function(project) {
				self.original = project;
				scope.project = new Trails(self.original);
			});

			scope.isClean = function() {
				return angular.equals(self.original, scope.project);
			};

			scope.destroy = function() {
				self.original.destroy(function() {
					$location.path('/list');
				});
			};

			scope.save = function() {
				scope.project.update(function() {
					$location.path('/');
				});
			};
		};

		EditCtrl.$inject = ['$scope', '$location', '$routeParams', 'Trails'];

		return {
			list: ListCtrl,
			edit: EditCtrl
		};
});
