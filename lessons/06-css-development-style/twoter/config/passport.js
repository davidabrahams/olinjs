var config = require('../oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/account');

module.exports = function(passport) {
  // passport config
  passport.use(new LocalStrategy(Account.authenticate()));
  // passport.serializeUser(Account.serializeUser());
  // passport.deserializeUser(Account.deserializeUser());

  // serialize and deserialize
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {

        // find the user in the database based on their facebook id
        Account.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          if (err)
              return done(err);
          if (user) {
              return done(null, user);
          } else {
            // if there is no user found with that facebook id, create them
            var newUser            = new Account();

            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id
            console.log(JSON.stringify(profile));
            newUser.facebook.name  = profile.displayName;

            // save our user to the database
            newUser.save(function(err) {
                if (err) throw err;
                // if successful, return the new user
                return done(null, newUser);
            });
          }

        });
      });
    }
  ));

};
