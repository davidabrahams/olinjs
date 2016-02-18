var express = require('express');
var router = express.Router();
var passport = require('passport');
var async = require('async');
var Account = require('../models/account');
var Twote = require('../models/twote');

/* GET home page. */
router.get('/', function (req, res) {
  async.parallel({twotes: function (callback) {
        Twote.find({}).sort([['_id', -1]]).populate("_creator").exec(function (err, twotes) {
            callback(null, twotes);
          });
        },
      users: function (callback) {
        Account.find({}).sort([['username', -1]]).exec(function (err, users) {
          callback(null, users);
        });
      },
      user: function (callback) {
        callback(null, req.user)
      }
    },
    function(err, results) {
      res.render('index', results);
    });
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/twote', function (req, res) {
  if (req.user)
  {
    var tw = new Twote({text: req.body.twote_text, _creator: req.user._id});
    // t.populate('_creator').exec(function(err, t) {

    // });
    tw.save(function (err, item) {
      Twote.findOne(item).populate('_creator').exec(function (err, t) {
        if (err) return res.status(500).send();
        Account.findByIdAndUpdate(t._creator._id, {$push: {"twotes": t._id}},
                                {safe: true, upsert: true}, function(err, user)
                                {
                                  if (err) return res.status(500).send();
                                  res.send({twote: t, user: user})
                                });
      });
    });
  }
  else {return res.status(403).send();}
});

router.get('/twote', function (req, res) {
  var user_ids = req.query.user_ids;
  var query = {};
  if (user_ids)
    query = {'_creator': {$in: user_ids}};

  Twote.find(query).sort([['_id', -1]]).populate("_creator").exec(function(err, twotes) {
    res.send({twotes: twotes});
  });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
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
