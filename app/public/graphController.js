//public/mainController
var friendsApp = angular.module("graphApp", ['facebook'])
.config(function(FacebookProvider) {
  FacebookProvider.init('1190530957644301');
});

friendsApp.controller('graphController',['$scope','$http', function($scope, $http, Facebook) {

  $scope.login = function() {
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        // Do something with response.
        $scope.token = response.accessToken;
        $scope.userId = response.userID;
      });
    };

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    $scope.me = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };
}]);
