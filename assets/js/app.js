var app = angular.module('app', ['ngRoute', 'ngResource']);
//console.log("angular");

//Set up the angular routes #/tasks
app.config(['$routeProvider', function($routeProvider) {
	//console.log('configuring routes');
	$routeProvider
		.when('/tasks', {
			templateUrl: '../tasks.html',
			controller: 'ViewController'
		})
		.when('/tasks/:taskId', {
			templateUrl: '../editTasks.html',
			controller: 'EditController'
		})
		.otherwise({
			redirectTo: '/tasks'
		});
}]);

app.factory('TaskService', ['$resource', function($resource){
  return $resource('/tasks/:taskId', {}, {
    list: {
    	isArray: true
    },
    get: {
    	isArray: true
    },
    save: {
    	method: 'POST'
    },
    update: {
    	method: 'PUT'
    }
  });
}]);