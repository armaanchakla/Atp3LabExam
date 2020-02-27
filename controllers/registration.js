var express 	= require('express');
var router 		= express.Router();
var userModel	= require.main.require('./models/user-model');

router.get('/', function(req, res){
	console.log('registration page requested!');
	res.render('registration/index');
});

router.post('/', function(req, res){
		
		var user ={
			username: req.body.uname,
			password: req.body.password,
			//confirmPassword: req.body.confirmPassword
			//mail: req.body.mail			
		};

		userModel.validate(user, function(status){
			if(status){
				res.cookie('username', req.body.uname);
				res.redirect('/admin');
			}else{
				res.redirect('/login');
			}
		});
});

module.exports = router;

