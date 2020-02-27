var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('admin/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('admin/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})


router.get('/edit/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('admin/edit', {user: result});
	});
})

router.post('/edit/:id', function(req, res){
	
	var user = {
		username: req.body.username,
		password: req.body.password,
		type: req.body.type,
		id: req.params.id
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/admin/alluser');
		}else{
			res.redirect('/admin/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:id', function(req, res){
	
	userModel.getById(req.params.id, function(result){
		res.render('admin/delete', {user: result});
	});
})

router.post('/delete/:id', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/admin/alluser');
		}else{
			res.redirect('/admin/delete/'+req.params.id);
		}
	});
})

module.exports = router;

