var myApp = angular.module('myApp', []);

myApp.controller('mainController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside main controller');

  $scope.login = function(){

    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      console.log(response);
      $window.location.href = '/home';
    }, function errorCallback(error) {
      console.log('error', error);
      $window.location.href = '/';
    });
  };
}]);

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  console.log('inside register controller');

  $scope.register = function() {
    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };

    $http({
      method: 'POST',
      url: '/register',
      data: userInfo
    }).then(function successCallback(response) {
      console.log('success', response);
      $window.location.href = '/';
    }, function errorCallback(error) {
      console.log('error occurred!');
    });
  };
}]);

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  console.log('HomeController');

  $scope.items = [];
  //get all items from server
  $scope.getItems = function() {
    console.log('in getItems');
  }; // end getItems
  $http({
    method: 'GET',
    url: '/items'
  }).then(function(response) {
    console.log(response);
    $scope.items = response.data;
  }); // end $http
}]); // end HomeController

myApp.controller('AddItemController', ['$scope', '$http', function($scope, $http) {
  console.log('add item controller');

  $scope.addItem = function() {
    console.log('in addItem');

    var objectToSend = {
      description: $scope.descriptionIn,
      img_url: $scope.imageUrlIn
    };//end object

    $http ({
      method: "POST",
      url: '/addItems',
      data: objectToSend
    }).then (function (response){
      console.log('response ->', response);
    });
  }; // end addItem


}]);
