'use strict';

/**
 * @ngdoc function
 * @name guessMelodyApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the guessMelodyApp
 */
angular.module('guessMelodyApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
