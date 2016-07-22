var db = require('../lib/connection.js');

exports.create = function(taskObj, callback) {
	//var values = [description, parentId ? parentId: null];
	db.getConn().getConnection(function(err, connection){
		if(err) {
			return callback(err);
		}
	
		connection.query('INSERT INTO Tasks SET ?', taskObj, function(err, result){
			connection.release();
			if(err) {
				//console.log('failed!');
				console.log(err);
				return callback(err);
			}
			//console.log('inserted!');
			//console.log(result);
			callback(null, result.insertId);
		});
	});
};

exports.getAll = function(callback){
	db.getConn().getConnection(function(err, connection){
		if(err) {
			return callback(err);
		}
		connection.query('SELECT * FROM Tasks ORDER BY path', function(err, results){
			connection.release();
			if(err) {
				return callback(err);
			}
			if(results){
				results.forEach(function(task){
					task.Complete = Boolean(task.Complete);
				});
				callback(null, results);
			}
		});
	});
};

exports.getAllByParentId = function(parentId, callback) {
	db.getConn().getConnection(function(err, connection){
		if(err) {
			return callback(err);
		}
	
		connection.query('SELECT * FROM Tasks WHERE ParentTask = ?', parentId, function(err, results){
			connection.release();
			if(err) {
				return callback(err);
			}
			callback(null, results);
		});
	});
};

exports.getTaskAndChildren = function(taskId, callback){
	var ids = [taskId, taskId];
	db.getConn().getConnection(function(err, connection){
		if(err){
			return callback(err);
		}
		connection.query('SELECT * FROM Tasks WHERE (Id = ? OR ParentTask = ?)', ids, function(err, results){
			connection.release();
			if(err){
				return callback(err);
			}
			callback(null, results);
		});
	})
}

exports.updateTask = function(taskId, body, callback) {
	//var values = [description, parentId ? parentId: null, taskId];
	//console.log('got values here: ' + values);
	//var taskInfo = [data.description, data.parentId];
	var values = [{
		"Description": body.Description,
		"Complete" : (body.Complete == true) ? 1 : 0,
		"TotalCompletionTime": body.hours + ":" + body.minutes,
		"TimeLeft": body.hours + ":" + body.minutes + ":00",
		"ParentTask": body.ParentTask
	},{
		"Id": taskId
	}];
	console.log(values);
	db.getConn().getConnection(function(err, connection){
		if(err){
			return callback(err);
		}
		connection.query('UPDATE Tasks SET ? WHERE ?', values, function(err, results){
			connection.release();
			if(err){
				return callback(err);
			}
			callback(null, results);
		});
	});
};

exports.updateTaskCompletion = function(taskId, completion, callback) {
	var values = [completion ? 1 : 0, taskId];

	db.getConn().getConnection(function(err, connection){
		if(err){
			return callback(err);
		}
		connection.query('UPDATE Tasks SET Complete=? WHERE Id=?', values, function(err, results){
			connection.release();
			if(err){
				return callback(err);
			}
			callback(null, results);
		});
	})
}