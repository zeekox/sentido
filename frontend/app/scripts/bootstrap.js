define([
      'require',
      'angular',
      'ngRoute',
      'app',
      'routes'
  ], function (require, ng) {
     'use strict';
 
     require(['domReady!'], function (document) {
         ng.bootstrap(document, ['app']);
     });
 });
