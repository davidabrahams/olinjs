var Restaurant = require('../models/restaurantModel.js');
var Ingredient = Restaurant.ingredient;
var Order = Restaurant.order;
var hbs = require('hbs');
var Handlebars = hbs.handlebars;

var routes = {};

routes.orderRoutesGET = function(req, res) {
  Ingredient.find({}, function(err, ings){
    res.render('order', {'ingredients': ings})
  });
};

routes.orderRoutesPOST = function(req, res) {
  var params = req.body;
  var ord = new Order({name: params.name,
                      ingredients: params['ingredients[]'],
                      cost: params.cost});
  ord.save(function (err) {
      if (err) res.status(500).send("Error!");
      else res.send(ord);
  });
};



module.exports = routes;
