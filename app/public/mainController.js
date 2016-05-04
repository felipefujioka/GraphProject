//public/mainController
var friendsApp = angular.module("friendsApp", []);

friendsApp.controller("mainController", function($scope, $http) {
        $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/friend')
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            $http.post('/api/friend', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            $http.delete('/api/friend/' + id)
                .success(function(data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };

});
