var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect('mongodb://localhost/passportjwt');

var LocalStrategy = require('passport-local').Strategy;

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/register.html');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/hello', function (req, res) {
  res.json({hello: 'world'});
});

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html');
});

app.post('/register', function(req, res){

});

app.post('/login', function(req, res){

});

app.listen(8000);
