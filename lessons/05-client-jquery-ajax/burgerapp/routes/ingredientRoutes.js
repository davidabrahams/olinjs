var express = require('express');
var path = require('path');
var router = express.Router();
var Restaurant = require('../models/restaurantModel.js');
var Ingredient = Restaurant.ingredient;
var hbs = require('hbs');
var Handlebars = hbs.handlebars;

var routes = {};

routes.ingredientRoutesGET = function(req, res) {
  Ingredient.find({}, function(err, ings){
    res.render('ingredients', {'ingredients': ings})
  });
};

routes.ingredientRoutesPOST = function(req, res) {
    var params = req.body;
    var ing = new Ingredient({name: params.name,
      price: params.price, in_stock: true});
    ing.save(function (err) {
        if (err) {
            console.log("Problem saving", err);
            res.status(500).send("Error!");
        }
        else {
          res.send(ing);
        }
    });
};

routes.ingredientRoutesOutOfStock = function(req, res) {
  var id = req.body.id;
  var stock = req.body.stock;
  Ingredient.findById(id, function (err, ing) {
    if (err) {
      res.status(500).send("Error!");
    }
    else {
      ing.in_stock = stock;
      ing.save(function (err) {
        if (err) {
          res.status(500).send("Error!");
        } else {
          res.send(ing);
        }
      });
    }
  });
};


routes.ingredientRoutesEDIT = function(req, res) {
    var params = req.body;
    Ingredient.findById(params.id, function (err, ing) {
    if (err) {
      res.status(500).send("Error!");
    }
    else {
      ing.name = params.name;
      ing.price = params.price;
      ing.save(function (err) {
        if (err) {
          res.status(500).send("Error!");
        } else {
          res.send(ing);
        }
      });
    }
  });
};


module.exports = routes;
