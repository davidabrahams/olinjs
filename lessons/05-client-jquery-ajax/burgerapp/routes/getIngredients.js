var express = require('express');
var path = require('path');
var router = express.Router();
var Restaurant = require('../models/restaurantModel.js');
var Ingredient = Restaurant.ingredient;

var routes = {};

routes.getIngredientsGET = function(req, res, next) {
  Ingredient.find({}, function(err, ings){
    res.render('ingredients', {'ingredients': ings})
  });
};

routes.getIngredientsPOST = function(req, res, next) {
  Ingredient.find({}, function(err, ings){
    res.render('ingredients', {'ingredients': ings})
  });
};

module.exports = routes;
