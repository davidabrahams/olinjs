// This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var catSchema = mongoose.Schema({
  age: Number,
  name: String,
  colors: [String]
});

module.exports = mongoose.model("cat", catSchema);
