var express = require('express');
var path = require('path');
var router = express.Router();
var Restaurant = require('../models/restaurantModel.js');
var Ingredient = Restaurant.ingredient;

var routes = {};

routes.ingredientRoutesGET = function(req, res) {
  Ingredient.find({}, function(err, ings){
    res.render('ingredients', {'ingredients': ings})
  });
};

routes.ingredientRoutesPOST = function(req, res) {
	var params = req.body;
	var ing = new Ingredient({name: params.name, price: params.price});
	ing.save(function (err) {
    	if (err) {
    		console.log("Problem saving", err);
    		res.status(500).send("Error!");
    	}
    	else {res.send(ing)}
  	});
};

module.exports = routes;
