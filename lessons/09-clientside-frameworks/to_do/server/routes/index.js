var express = require('express');
var router = express.Router();
var path = require("path");
var Todo = require("../models/todo");

 // GET home page.
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

router.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
    if (err) res.send(err)
    res.json(todos);
  });
});

router.post('/api/todos', function(req, res) {
  Todo.create({
    text : req.body.text
  }, function(err, todo) {
    sendTodos(res, err);
  });
});

router.post('/api/todos/edit', function(req, res) {
  console.log(req.params.todo_id);
});

// delete a todo
router.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    sendTodos(res, err);
  });
});

var sendTodos = function (res, err) {
  if (err)
    res.send(err);
  Todo.find(function(err, todos) {
    if (err) res.send(err)
    res.json(todos);
  });
};

module.exports = router;
