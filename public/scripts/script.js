var verbose = false;
var myApp = angular.module('myApp', []);

myApp.controller('mainController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  if (verbose) console.log('inside main controller');
  $scope.login = function(){
    //assemble object to send
    var userInfo = {
      username: $scope.username,
      password: $scope.password
    };
    $http({
      method: 'POST',
      url: '/',
      data: userInfo
    }).then(function successCallback(response) {
      $window.location.href = '/home';
    }, function errorCallback(error) {
      if (verbose) console.log('error', error);
      $window.location.href = '/';
    });
  };
}]);

myApp.controller('registerController',['$scope', '$http', '$window',
  function($scope, $http, $window) {
  if (verbose) console.log('inside register controller');

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
      if (verbose) console.log('success', response);
      $window.location.href = '/';
    }, function errorCallback(error) {
      if (verbose) console.log('error occurred!');
    });
  };
}]);

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
  if (verbose) console.log('HomeController');
  $scope.items = [];
  //get all items from server
  var getItems = function() {
    if (verbose) console.log('in getItems');
  $http({
    method: 'GET',
    url: '/items'
    }).then(function(response) {
      $scope.items = response.data;
    }); // end $http
  }; // end getItems

  $scope.init = function() {
    getItems();
    verifyLogin();
    $scope.showUsersDiv = false;
  }; // end init

  var verifyLogin = function() {
    if (verbose) console.log('in verifyLogin');
    $scope.verified = '';
    //check to see if user is logged in
    $http({
      method: 'GET',
      url: '/items/validate'
    }).then(function(response) {
      $scope.verified = response.data.verified;
      $scope.username = response.data.username;
      getUsersForVerified($scope.verified);
    }); // end $http
  }; // end verifyLogin

  $scope.deleteItem = function (id){
    if (verbose) console.log('id', id);
    $http ({
      method: 'DELETE',
      url: '/items/' + id
    }).then (function (response){
      getItems();
    });
  };//end delete item

  var getUsersForVerified = function(verificationBoolean) {
    if (verbose) console.log('in getUsersForVerified-->', verificationBoolean);
    if (verificationBoolean === false) {
      //exit function
      return;
    } else {
      //get all users from server
      $http({
        method: 'GET',
        url: '/user'
      }).then(function(response) {
        $scope.usernames = response.data;
        $scope.showUsersDiv = true;
      }); // end $http
    }
  }; // end getUsersForVerified

  $scope.verifyUsername = function (placer, username) {
    if (verbose) console.log('placer then username', placer, username);
    if (placer == username && username !== false) {
      return true;
    } else {
      return false;
    }
  };//end verifyUsername

}]); // end HomeController

myApp.controller('AddItemController', ['$scope', '$http', function($scope, $http) {
  if (verbose) console.log('add item controller');

  $scope.addItem = function() {
    if (verbose) console.log('in addItem');
    //assemble object to send
    var objectToSend = {
      description: $scope.descriptionIn,
      img_url: $scope.imageUrlIn
    };//end object
    $http ({
      method: "POST",
      url: '/addItems',
      data: objectToSend
    }).then (function (response){
      if (verbose) console.log('response ->', response);
      clearForm();
      showAlertSuccess();
    });
  }; // end addItem

  var clearForm = function() {
    $scope.descriptionIn = '';
    $scope.imageUrlIn = '';
  }; // end clearForm

  var showAlertSuccess = function() {
    $scope.itemAddSuccess = true;
  }; // end showAlertSuccess

}]);
