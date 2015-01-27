'use strict';

/**
 * @ngdoc function
 * @name guessMelodyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the guessMelodyApp
 */
angular.module('guessMelodyApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
