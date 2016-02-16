var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var Twote = require('../models/twote');

function loggedIn(req, res, next) {
  if (req.user)
    next();
}

/* GET home page. */
router.get('/', function (req, res) {
  if (req.user) {
    Twote.find({}).sort([['_id', -1]]).populate("_creator").exec(function (err, twotes) {
      var twote_user = [];
      twotes.forEach(function (twote) {
        user = twote._creator;
        twote_user.push({twote: twote, user: user});
      });
      res.render('index', { twote_user : twote_user });
      console.log(JSON.stringify(twote_user));
    });
  }
  else res.redirect('/login');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/twote', function (req, res) {
  if (req.user)
  {
    var t = new Twote({text: req.body.twote_text, _creator: req.user._id});
    t.save(function (err) {
      if (err) return res.status(500).send();
      Account.findByIdAndUpdate(t._creator, {$push: {"twotes": t._id}},
                                {safe: true, upsert: true}, function(err, user)
                                {
                                  if (err) return res.status(500).send();
                                  res.send({twote: t, user: user})
                                });
    });
  }
  else {return res.status(403).send();}
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).send(err.message); }
    if (!user) { return res.status(401)
      .send("A user with that password could not be found.");}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({redirect: '/'});
    });
  })(req, res, next);
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }),
                   req.body.password, function(err, account) {
    if (err) {
      return res.status(500).send(err.message);
    }

    passport.authenticate('local')(req, res, function () {
      res.send({redirect: '/'});
    });
  });
});

module.exports = router;
