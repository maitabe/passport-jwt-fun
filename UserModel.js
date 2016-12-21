var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
//node library
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
  username: String,
  hash: String
});

//generate JWT
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
};

//method to generate the hash and set it on the user
UserSchema.methods.setPassword = function(password){
  //create a hash
  var hash = crypto.createHash('md5');

  hash.update(password, 'utf8');
  this.hash = hash.digest('hex');

   this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

};

//hash with incoming password and will compare it to the hash already in the DB
UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;

  var newHash = crypto.createHash('md5');

  newHash.update(password, 'utf8');
  var hash = newHash.digest('hex');
  console.log(hash);
   if(hash ===  this.hash ) {
    console.log(hash);
    console.log(this.hash);
      return true;
   }else {
    console.log('this is false password');
    return false;
   }


};


var User = mongoose.model('User', UserSchema);

module.exports = User;