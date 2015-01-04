'use strict';

require.config({
		paths: {
			jquery: '../bower_components/jquery/dist/jquery.min',
			leaflet: '../bower_components/leaflet/dist/leaflet',
			underscore: '../bower_components/underscore/underscore',
			angular: '../bower_components/angular/angular',
			ngRoute: '../bower_components/angular-route/angular-route',
			ngResource: '../bower_components/angular-resource/angular-resource',
			domReady: '../bower_components/requirejs-domready/domReady',
			fastclick: '../bower_components/fastclick/lib/fastclick',
			foundation: '../bower_components/foundation/js/foundation.min'
		},
		shim: {
			'leaflet': {
				exports: 'L'
			},
			'angular': {
				exports: 'angular',
				deps: ['jquery']
			},
			'ngRoute': {
				exports: 'angular',
				deps: ['angular']
			},
			'ngResource': {
				exports: 'angular',
				deps: ['angular']
			}

		},
		// kick start application
		deps: ['./bootstrap']
});
