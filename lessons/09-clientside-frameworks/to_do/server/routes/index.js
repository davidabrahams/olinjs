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
    text : req.body.text,
    completed: false
  }, function(err, todo) {
    sendTodos(res, err);
  });
});

router.post('/api/todos/edit', function(req, res) {
  var todo = req.body.todo;
  Todo.update({ _id: todo._id }, { $set: { text: todo.text }}, function (err, todo) {});
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
