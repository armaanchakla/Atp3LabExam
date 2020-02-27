var db = require('./db');

module.exports={


register : function(user, callback){
	    var sql = "insert into user values('','" + user.username + "', '" + user.password + "', '"+user.type+"')";
		db.execute(sql, function(status){
			callback(status);
			
		});
	},
}