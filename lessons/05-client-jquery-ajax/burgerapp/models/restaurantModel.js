// This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  price: Number,
  in_stock: Boolean
});

// Create a Schema
var orderSchema = mongoose.Schema({
  name: String,
  ingredients: [String],
  cost: Number
});

module.exports.ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports.order = mongoose.model("order", orderSchema);
