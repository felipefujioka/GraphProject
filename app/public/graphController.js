//public/mainController
var friendsApp = angular.module("graphApp", []);

friendsApp.factory('facebook', ['$window', function($window) {

    //get FB from the global (window) variable.
    var FB = $window.FB;

    // gripe if it's not there.
    if(!FB) throw new Error('Facebook not loaded');

    //make sure FB is initialized.
    FB.init({
      appId      : '1190530957644301',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

    return {
        // a me function
        me: function(callback) {
            FB.api('/me', callback);
        }

        //TODO: Add any other functions you need here, login() for example.
    }
}]);

friendsApp.controller("graphController", function($scope, $http, facebook) {

  facebook.FB.getLoginStatus(function(response) {
    $scope.token = response.authResponse.accessToken
    $scope.userId = response.authResponse.userId
  });

  $scope.watch('token', function(oldValue, newValue) {

  });


});
