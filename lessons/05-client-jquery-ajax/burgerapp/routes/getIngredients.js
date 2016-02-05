var express = require('express');
var path = require('path');
var router = express.Router();
var Restaurant = require('../models/restaurantModel.js');
var Ingredient = Restaurant.ingredient;

var routes = {};

routes.getIngredientsGET = function(req, res, next) {
  var ingredients = Ingredient.find({});
  res.render('ingredients', {'ingredients': ingredients});
};

module.exports = routes;
