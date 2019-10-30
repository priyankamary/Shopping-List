// require jwt, helper, User, List
var jwt = require('jwt-simple');
var helper = require('../config/helpers.js');
var User = require('./userModel.js')

module.exports = {
  // signin method
  signin: function(req, res){
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;

    console.log("username: "+username)
    // This uses a comparePasswords method of the user model.
    User.findOne({'username': username}, function(err, user){
      // Error thrown when mongo is not connected
      if (err) {
        console.log("mongo findOne signin err: ", err);
        helper.sendError(err, req, res);
      } else {
        // Logic for user not found in database
        if (!user) { 
          helper.sendError("No user found", req, res);
        } else {
          match = (password === user.password)

          if (!match) { // notifies if password is invalid
              helper.sendError("Password invalid", req, res);
          }else { // signin success, assigns jwt session token
             var token = jwt.encode(user, 'secret');
             res.json({

                 token: token, //session token should be set on client side
                 // userid also returned
                 userid: user['_id'],
                 username: user['username'] //username is returned for identity of person creating item
             });
          }
        }
      }
    });
  },

  signup: function(req, res){
    newUserObj = req.body
    User.create(newUserObj, function(err, user){
      if (err) { // notifies if error is thrown
        console.log("mongo create user err: ", err);
        helper.sendError(err, req, res);
      } else { // signup success, assigns jwt session token
        var token = jwt.encode(user, 'secret');
        res.json({
          token: token, //session token will be set on client side
          // userid also returned.  This should be assigned to a cookie also so that it is available for future server requests and db queries.
          userid: user['id']
          // anything else to send back on success?
        });
      }
    });
  }
};