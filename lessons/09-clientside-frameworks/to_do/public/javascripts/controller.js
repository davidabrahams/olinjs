// // $.fn.editable.defaults.mode = 'inline';

var app = angular.module('app', ["xeditable"]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.filter('incomplete', function() {
  return function(input) {
    if (input.completed == false) return input
  };
});

app.controller('mainController', function ($scope, $filter, $http) {

  $scope.formData = {};

  $scope.updateTodo = function(todo) {
    $http({
      method: 'POST',
      url: '/api/todos/edit',
      data: {todo: todo}
    }).then(function successCallback(response) {}, function errorCallback(response) {});
  };

  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http.post('/api/todos', $scope.formData)
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
    $http.delete('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
  };
  $scope.editTodo = function(id) {
    $http.post('/api/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.completeTodo = function(id, complete) {
    $http({
      method: 'POST',
      url: '/api/todos/complete',
      data: {id: id, completed: complete}
    }).then(function successCallback(response) {
      console.log(response)
        $scope.todos = response.data;
      }, function errorCallback(response) {});
  };
});
