var request = require('supertest');
var user = request.agent('http://localhost:3000');
var app = require('./../../app.js');
var Account = require('../../models/account');
var Twote = require('../../models/twote');

var call_done = function (done, err) {
  if (err) return done(err);
  done();
}

describe("The app", function() {

  var temp_username = 'jaV7McuWSmnPqe6KFI2S';
  var temp_password = 'JUwDAr1w1bslgatKs4YJ';

  it('should return 200 OK on GET /', function(done) {
    request(app).get('/').expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on GET /login', function(done) {
    request(app).get('/login').expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on POST /register', function(done) {
    user.post('/register').send({username: temp_username, password: temp_password}).expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 500 "Internal Server Error" on POST /register', function(done) {
    user.post('/register').send({username: temp_username, password: temp_password}).expect(500).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on POST /login', function(done) {
    user.post('/login').send({username: temp_username, password: temp_password}).expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on GET /logout', function(done) {
    user.get('/logout').expect(302).expect('Location', '/login').end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on POST /login', function(done) {
    user.post('/login').send({username: temp_username, password: temp_password}).expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on POST /twote', function(done) {
    user.post('/twote').send({twote_text: "8ch28jRq6a0deN9GPiLZ"}).expect(200).end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 200 OK on GET /logout', function(done) {
    user.get('/logout').expect(302).expect('Location', '/login').end(function(err, res) {
        call_done(done, err)
      });
  });

  it('should return 403 "Forbidden" on POST /twote', function(done) {
    user.post('/twote').send({twote_text: "8ch28jRq6a0deN9GPiLZ"}).expect(403).end(function(err, res) {
        call_done(done, err)
      });
  });

  Account.find({username: temp_username}).remove(function (err, user) { });
  Twote.find({text: "8ch28jRq6a0deN9GPiLZ"}).remove(function (err, twote) { });

  // it('should respond with the correct html on GET /', function(done) {
  //   request(app)
  //     .get('/')
  //     .expect('Content-Type', 'text/html; charset=utf-8')
  //     .expect('Content-Length', '515', done); // ...or this way, inline!
  // });

//   // it('should return 200 OK on GET /cats', function(done) {
//   //   request(app)
//   //     .get('/cats')
//   //     .expect(200, done);
//   // });

//   // it('should respond with the correct html on GET /cats', function(done) {
//   //   request(app)
//   //     .get('/cats')
//   //     .expect('Content-Type', 'text/html; charset=utf-8')
//   //     .expect('Content-Length', '151', done);
//   // });

//   // // What other routes can you test?

//   // it('should return 404 on GET /notaroute', function(done) {
//   //   request(app)
//   //     .get('/notaroute')
//   //     .expect(404, done);
//   // });
});
