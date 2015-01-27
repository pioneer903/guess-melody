'use strict';

/**
 * @ngdoc filter
 * @name guessMelodyApp.filter:myFilter
 * @function
 * @description
 * # myFilter
 * Filter in the guessMelodyApp.
 */
angular.module('guessMelodyApp')
  .filter('myFilter', function () {
    return function (input) {
      return 'myFilter filter: ' + input;
    };
  });
