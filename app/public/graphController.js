//public/mainController
var friendsApp = angular.module("graphApp", []);

friendsApp.controller("graphController", function($scope, $http) {

  FB.getLoginStatus(function(response) {
    $scope.token = response.authResponse.accessToken
    $scope.userId = response.authResponse.userId
  });

  $scope.watch('token', function(oldValue, newValue) {

  });


});
