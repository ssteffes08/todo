app.controller('EditController', ['$scope', 'TaskService', '$routeParams', '$location', function($scope, TaskService, $routeParams, $location){
	$scope.task = {};
	$scope.tasks = [];
	$scope.newTask = false;
	$scope.hours = 0;
	$scope.minutes = 0;
	$scope.seconds = 0;

	TaskService.list(function(data){
		$scope.tasks = data;
		var currIndex = 0;
		var routeId = $routeParams.taskId;
		for(currIndex; currIndex < $scope.tasks.length; currIndex++) {
			if($scope.tasks[currIndex].Id == routeId) {
				break;
			}
		}
		if(currIndex < $scope.tasks.length) {
			$scope.task = $scope.tasks.splice(currIndex, 1)[0];
			if($scope.task.TotalCompletionTime !== null) {
				var timeArr = $scope.task.TotalCompletionTime.split(':');
				var hours = Number(timeArr[0]);
				var minutes = Number(timeArr[1]);
				var seconds = Number(timeArr[2]);
			}
		} else {
			$scope.newTask = true;
		}
	});

	$scope.go = function(link){
		$location.path(link);
	};

	$scope.save = function(task){
		if($scope.newTask) {
			$scope.TotalCompletionTime = $scope.hours.toString() + ":" + $scope.minutes.toString() + ":" + $scope.seconds.toString();
			TaskService.save(
			task, function(data){
				console.log(data);
				$scope.go('/tasks');
			});
		} else {
			TaskService.update({
				taskId: task.Id
			}, task, function(data){
				console.log(data);
				$scope.go('/tasks');
			});
		}
	};

}]);