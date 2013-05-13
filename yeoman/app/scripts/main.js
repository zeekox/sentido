'use strict';

require.config({
		paths: {
			jquery: '../components/jquery/jquery.min',
			leaflet: '../components/leaflet/dist/leaflet',
			underscore: '../components/underscore/underscore',
			angular: '../components/angular/angular',
			ngResource: '../components/angular-resource/angular-resource'
		},
		shim: {
			'leaflet': {
				exports: 'L'
			},
			'angular': {
				exports: 'angular',
				deps: ['jquery']
			},
			'ngResource': {
				exports: 'angular',
				deps: ['angular']
			}

		}
});

require([ 'directives/map', 'app', 'angular'],
	function (dir, app, angular) {


	angular.element(document).ready(function() {
		angular.bootstrap(document, [app.mainModule]);
	});

});
