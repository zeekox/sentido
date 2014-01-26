 define([
      'angular',
      'ngResource',
      './controllers/index',
      './directives/index',
      //'./filters/index',
      './services/index'
  ], function (ng) {
      'use strict';
  
     return ng.module('app', [
     		'ngRoute',
     		'ngResource',
         'app.controllers',
         //'app.filters',
         'app.directives',
         'app.services'
     ]);
 });
