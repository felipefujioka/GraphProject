//public/mainController
var friendsApp = angular.module("graphApp", ['facebook'])
.config(function(FacebookProvider) {
  FacebookProvider.init('1190530957644301');
});

friendsApp.controller('graphController',['$scope','$http','Facebook', function($scope, $http, Facebook) {
  $scope.loggingIn = '';

  $scope.login = function() {
    $scope.loggingIn = 'is-active';
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        // Do something with response.
        if(response.status === 'connected') {
          $scope.loggedIn = true;
          $scope.token = response.authResponse.accessToken;
          $scope.userId = response.authResponse.userID;
          getUser();
        } else {
          $scope.loggedIn = false;
        }
        $scope.loggingIn = '';
      });
    };

    var getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
          getUser();
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    var getUser = function() {
      Facebook.api('/me', function(response) {
        $scope.user = response;
      });
    };

    $scope.retrievePhotos = function() {

      $http({method: 'GET',
  	        url: 'https://graph.facebook.com/me/photos?fields=source&limit=10',
  	    	headers: {'Authorization': 'OAuth '+$scope.token}}).success(function(data) {
  		         $scope.photos = data.data;
  	  });

  		$http({method: 'GET',
  		        url: 'https://graph.facebook.com/me/picture?redirect=false',
  		    	headers: {'Authorization': 'OAuth '+$scope.token}}).success(function(data) {
  			$scope.picture = data.data;
  		});

    };

    getLoginStatus();
}]);
