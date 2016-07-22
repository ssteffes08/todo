var mysql = require('mysql');

var state = {
	pool: null
};

/*var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'Uojzbxob1',
	database: 'todo',
	connectionLimit: 20,
	queueLimit: 100,
	waitForConnections: true
});

var getConnection = function(callback){
	pool.getConnection(function(err, connection){
		callback(err, connection);
	});
};

module.exports = getConnection;*/

exports.connect = function(done) {
	state.pool = mysql.createPool({	
		host: 'localhost',
		user: 'root',
		password: 'Uojzbxob1',
		database: 'todo',
		connectionLimit: 20,
		queueLimit: 100,
		waitForConnections: true
	});
	done();
};

exports.getConn = function() {
	return state.pool;
};