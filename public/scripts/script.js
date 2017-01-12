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
  var getItems = function() {
    console.log('in getItems');

  $http({
    method: 'GET',
    url: '/items'
  }).then(function(response) {
    console.log('get items response ->', response);
    $scope.items = response.data;
  }); // end $http
}; // end getItems

  $scope.init = function() {
    getItems();
    verifyLogin();
  }; // end init

  var verifyLogin = function() {
    console.log('in verifyLogin');
    $scope.verified = '';
    //check to see if user is logged in
    $http({
      method: 'GET',
      url: '/items/validate'
    }).then(function(response) {
      console.log(response);
      $scope.verified = response.data.verified;
    }); // end $http
  }; // end verifyLogin

  $scope.deleteItem = function (id){
    console.log('id', id);
    $http ({
      method: 'DELETE',
      url: '/items/' + id
    }).then (function (response){
      console.log(response);
      getItems();
    });
  };//end delete item

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
