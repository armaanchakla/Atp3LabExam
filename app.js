//declaration
var express 		= require('express');
var bodyParser 		= require('body-parser');
var ejs 			= require('ejs');
var exSession 		= require('express-session');
var cookieParser 	= require('cookie-parser');

var login 			= require('./controllers/login');
var logout 			= require('./controllers/logout');
var admin 			= require('./controllers/admin');
var registration 	= require('./controllers/registration');


var app = express();

//configuration
app.set('view engine', 'ejs');


//middleware
//app.use('/css', express.static('css'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());

app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/registration', registration);


//routes
app.get('/', function(req, res){
	res.render('index');
});



//server startup
app.listen(3000, function(){
	console.log('server started at 3000!');
});
