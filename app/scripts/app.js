define([
		'angular',
		'ngResource',
		'services/trail',
		'controllers/list',
		'directives/map'
	],

	function (angular, ngResource, trailService, listController, mapDirective) {

		'use strict';

		var ngMainModule = 'project';

		angular.module(ngMainModule, [mapDirective]).
		config(['$routeProvider', function (routeProvider) {
				routeProvider.
				when('/', {controller: listController.list, templateUrl: 'list.html'}).
				when('/edit/:trailId', {controller: listController.edit, templateUrl: 'list.html'}).
				otherwise({redirectTo: '/'});
		}]);

		return {
			mainModule: ngMainModule
		};

});
