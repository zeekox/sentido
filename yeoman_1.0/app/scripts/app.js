define([
		'angular',
		'ngRoute',
		'ngResource',
		'services/trail',
		'controllers/list',
		'directives/map'
	],

	function (angular, ngRoute, ngResource, trailService, listController, mapDirective) {

		'use strict';

		var ngMainModule = 'project';

		angular.module(ngMainModule, [mapDirective, trailService]).
		config(function ($routeProvider) {
				$routeProvider.
				when('/', {controller: listController.list, templateUrl: 'list.html'}).
				//when('/edit/:trailId', { controller: listController.list, templateUrl: 'list.html'}).
				otherwise({redirectTo: '/'});
		});

		return {
			mainModule: ngMainModule
		};

});
