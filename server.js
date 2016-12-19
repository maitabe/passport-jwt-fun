var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//decrypt the JWT
var expressJWT = require('express-jwt');

var auth = expressJWT({secret: 'SECRET'});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect('mongodb://localhost/passportjwt');

var User = require('./UserModel');

var LocalStrategy = require('passport-local').Strategy;

//check if user exist or not on login
passport.use('login', new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      return done(null, user);
    });
  }
));


app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/register.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/hello', auth, function (req, res) {
  res.json(req.user);
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.post('/register', function(req, res){

	var user = new User();

	user.username = req.body.username;
	user.password = req.body.password;

	console.log(user);

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()});
  });

});

app.post('/login', function(req, res, next){
	passport.authenticate('login', function(err, user){
    if(err){ return next(err); }

    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401);
    }
  })(req, res, next);
});


app.listen(8000, function() {
	console.log('started app, listening the radio too ');
});
