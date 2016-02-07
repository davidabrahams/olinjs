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
    var ing = new Ingredient({name: params.name,
      price: params.price, in_stock: true});
    ing.save(function (err) {
        if (err) {
            console.log("Problem saving", err);
            res.status(500).send("Error!");
        }
        else {res.send(ing)}
    });
};

routes.ingredientRoutesOutOfStock = function(req, res) {
    var id = req.body.id;
    Ingredient.update({ _id: id},
                      { $set: { in_stock: false }},
                      function (err, raw) {
                        if (err) {
                            res.status(500).send("Error!");
                        }
                        else {
                            res.send(id);
                        }
                      });
};


routes.ingredientRoutesEDIT = function(req, res) {
    var params = req.body;

    Ingredient.update({ _id: params.id },
                      { $set: { name: params.name, price: params.price }},
                      function (err, raw) {
                        if (err) {
                            console.log("Problem editing", err);
                            res.status(500).send("Error!");
                        }
                        else {
                            res.send();
                        }
                      });
};


module.exports = routes;
