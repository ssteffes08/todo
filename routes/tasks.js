var express = require('express');
var taskModel = require('../models/tasks');

var router = express.Router();

router.get('/tasks', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //console.log("In tasks!");
  taskModel.getAll(function(err, data){
  	if(err) {
  		return next(err);
  	}
  	//console.log("GOT THE DATA!")
  	//console.log(data);

  	res.json(data);
  });
});

router.get('/tasks/:taskId', function(req, res, next){
	taskModel.getTaskAndChildren(req.params.taskId, function(err, data){
		if(err) {
			return next(err);
		}
		//console.log("Got the taskID & children");
		res.json(data);
	});
});

router.put('/tasks/:taskId', function(req, res, next){
	console.log('hit the put!' + req.params.taskId);
	console.log(req);
	taskModel.updateTask(req.params.taskId, req.body, function(err, data){
		if(err) {
			return next(err);
		}
		//console.log("Updated task " + req.params.taskId);
		res.json(data);
	});
});

router.post('/tasks', function(req, res, next){
	console.log('hit the post');
	//console.log(req);
	taskModel.create(req.body, function(err,data){
		if(err) {
			return next(err);
		}
		res.json(data);
	});
	//taskModel.create()
});

module.exports = router;