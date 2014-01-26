 define(['./app'], function (app) {
      'use strict';
      return app.config(['$routeProvider', function ($routeProvider) {
          /*$routeProvider.when('/view', {
              templateUrl: 'partials/partial.html',
              controller: 'MyCtrl'
          });
  
          $routeProvider.when('/view', {
             templateUrl: 'partials/partial.html',
             controller: 'MyCtrl'
         });*/

			$routeProvider.
			when('/', {
					controller: 'ListCtrl',
					templateUrl: 'list.html'
			});

         $routeProvider.otherwise({
             redirectTo: '/'
         });
     }]);
 });
