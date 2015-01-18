'use strict';

/* Controllers */


var guessMelodyApp = angular.module('guessMelodyApp', ["ui.router", "ngSanitize", "ngAudio"]);
var categoriesData = 'data/categories.json';

guessMelodyApp.config(function($stateProvider, $urlRouterProvider){
  
  // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/home")
  
  $stateProvider
  	.state('home', {
  		url: "/home",
  		templateUrl: "partials/home.html"
  	})
  	.state('categories', {
  		url: "/categories",
  		templateUrl: "partials/categories.html",
  		controller: "CategoryCtrl"
  	})
  	  .state('categories.list', {
  	  	url: "/:category",
  	  	templateUrl: "partials/songs.list.html", 
  	  	controller:  "ListSongsCtrl"
  	  })
    .state('all_audio', {
        url: "/all_audio",
        templateUrl: "partials/all_audio.html"
    })
      .state('route1.list', {	
          url: "/list",
          templateUrl: "route1.list.html",
          controller: function($scope){
            $scope.items = ["A", "List", "Of", "Items"];
          }
      })
      
    .state('route2', {
        url: "/route2",
        templateUrl: "route2.html"
    })
      .state('route2.list', {
          url: "/list",
          templateUrl: "route2.list.html",
          controller: function($scope){
            $scope.things = ["A", "Set", "Of", "Things"];
          }
      })
    // list from exapmle https://egghead.io/lessons/angularjs-introduction-ui-router
    .state('list', {
    	url: '/list',
    	templateUrl: 'templates/list.html',
    	controller: 'ListCtrl'
    })
    	.state('list.item', {
    		url: '/:item', 
    		templateUrl: 'templates/list.item.html',
    		controller: function ($scope, $stateParams) {
    			$scope.item = $stateParams.item;
    		}
    	})
})

.controller('ListSongsCtrl', ['$scope', '$http', '$stateParams', function listSongs ($scope, $http, $stateParams) {

	$http.get(categoriesData).success(function (data) {
		
		angular.forEach(data.categories, function get_siblings_value (val, key) {
			if(val.category_id === $stateParams.category){
				$scope.category= {
					category_id: val.category_id,
					category_description: val.category_description,
					category_name: val.category_name
				};
			}
		});

	});

}])
.controller('SongCtrl', ['$scope', '$http', function ($scope, $http, ngAudio) {
	var category = [];
	var categories = [];

  $http.get('data/songs.json').success( function(data) {
    
    $scope.songs = data;

  });

  $scope.orderProp = 'age';

  // $scope.sound = ngAudio.load("data/minus/Антошка_CUT.mp3"); // returns NgAudioObject

  // console.log($scope.sound )
  
}])

.controller('CategoryCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get(categoriesData).success( function (data) {
    
    $scope.categories = data.categories;

  });
  
  $scope.categoryOrder = 'category_name';

}])

// .controller("AudioController",function ($scope, ngAudio) {
//     $scope.sound = ngAudio.load("data/minus/Антошка_CUT.mp3"); // returns NgAudioObject
// })  


// Testing. may be removed
.controller('ListCtrl', function ($scope) {
	$scope.shoppingList = [
		{name: 'Milk'},
		{name: 'Eggs'},
		{name: 'Bread'},
		{name: 'Cheese'},
		{name: 'Ham'}
	];

	$scope.selectItem = function (selectedItem) {
		_($scope.shoppingList).each(function (item) {
			item.selected = false;
			if(selectedItem === item) {
				selectedItem.selected = true;
			}
		});
	};

})

guessMelodyApp.filter('substringText', function substringText (text) {
	return substring(1, 4);
})


// Remove duplicates from an array
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i].category_name === a[j].category_name)
                a.splice(j--, 1);
        }
    }

    // console.log(a)
    return a;
};

guessMelodyApp.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});





/**
 * Truncate Filter
 * @Param text
 * @Param length, default is 10
 * @Param end, default is "..."
 * @return string
 * http://jsfiddle.net/tUyyx/
 */
// guessMelodyApp.filter('truncate', function () {
//         return function (text, length, end) {
//             if (isNaN(length))
//                 length = 8;

//             if (end === undefined)
//                 end = "";

//             if (text.length <= length || text.length - end.length <= length) {
//                 return text;
//             }
//             else {
//                 return String(text).substring(1, length-end.length) + end;
//             }

//         };
//     });

/**
 * Usage
 *
 * var myText = "This is an example.";
 *
 * {{myText|Truncate}}
 * {{myText|Truncate:5}}
 * {{myText|Truncate:25:" ->"}}
 * Output
 * "This is..."
 * "Th..."
 * "This is an e ->"
 *
 */
