define([
      'require',
      'angular',
      'jquery',
      'foundation',
      'ngRoute',
      'app',
      'routes',
      'fastclick'
], function (require, ng, $) {
     'use strict';
     require(['domReady!'], function (document) {
         ng.bootstrap(document, ['app']);
         $(document).foundation();
         $('.login').show();
     });
 });
