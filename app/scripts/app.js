define([
		'angular',
		'ngResource',
		'services/trail',
		'controllers/list'
	],

	function(angular, ngResource, trailService, listController) {

		var ngMainModule = 'project';

		angular.module(ngMainModule, [trailService]).
		config(['$routeProvider', function(routeProvider) {
			routeProvider.
			when('/', {controller:listController.list, templateUrl:'list.html'}).
			when('/edit/:projectId', {controller:listController.edit, templateUrl:'detail.html'}).
			otherwise({redirectTo:'/'});
		}]);

		return {
			mainModule: ngMainModule
		};

});