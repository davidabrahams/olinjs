var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var Todo = mongoose.Schema({
    text: String
});

module.exports = mongoose.model("Todo", Todo);
