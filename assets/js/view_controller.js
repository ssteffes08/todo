app.controller('ViewController', ['$scope', 'TaskService', '$location', function($scope, TaskService, $location){
	$scope.tasks = [];
	$scope.task = {
		Description: "",
		ParentTask: null
	};

	$scope.adding = false;

	$scope.updateTaskList = function(){
		TaskService.list(function(data){
			$scope.tasks = data;
		});
		$scope.tasks.forEach(function(task){
			task.editing = false;
		});
	};

	$scope.updateTaskList();

	$scope.add = function(){
		$location.path('/tasks/newTask');
	};

	$scope.setIndentation = function(task){
		var dots = (task.path.match(/\./g) || []).length-1;
		//console.log("num dots: " + dots);
		var indentPx = (dots * 20).toString() + "px";
		//console.log("text indent: " + indentPx);
		return {"text-indent": indentPx};
	};
}]);