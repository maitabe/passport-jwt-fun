var mongoose = require('mongoose');
//module with a signature/secret (token)
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

//JWT(Jason Web Token)
//generate a token every time a user register
UserSchema.methods.generateJWT = function() {

	// set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');
  //first argument has the object with token payload
  //second argument  allow people to authenticate into the app
};

var User = mongoose.model('User', UserSchema);

module.exports = User;

