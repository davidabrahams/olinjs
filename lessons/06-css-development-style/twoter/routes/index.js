var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function (req, res) {
  if (req.user) res.render('index', { user : req.user });
  else res.redirect('/login');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).send(err.message); }
    if (!user) { return res.status(500)
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
