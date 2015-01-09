 define(['./app'], function (app) {
      'use strict';
      return app.config(['$routeProvider', function ($routeProvider) {
         $routeProvider.otherwise({
             redirectTo: '/'
         });
     }]);
 });
