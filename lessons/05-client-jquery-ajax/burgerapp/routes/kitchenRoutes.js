var Restaurant = require('../models/restaurantModel.js');
var Order = Restaurant.order;
var hbs = require('hbs');
var Handlebars = hbs.handlebars;

var routes = {};

routes.kitchenRoutesGET = function(req, res) {
  Order.find({}, function(err, os){
    res.render('kitchen', {'order': os})
  });
};

routes.kitchenRoutesDELETE = function(req, res) {
  var id = req.body.id;
  Order.findByIdAndRemove(id, function (err, or) {
    if (err) res.status(500).send("Error!");
    else res.send(or);
  });
};

module.exports = routes;
