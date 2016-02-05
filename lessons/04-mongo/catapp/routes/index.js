var express = require('express');
var router = express.Router();
var Cat = require('../models/catModel.js');
var db = require('../fakeDatabase.js');

// function Cat(age, name, colors)
// {
// 	var cat = {
// 		name: name,
// 		age: age,
// 		colors: colors,
// 	}
// 	return cat;
// }

function randomName()
{
	var names = ["Bella", "Tigger", "Chloe", "Shadow", "Oliver", "Lucy", "Molly", "Jasper", "Kitty", "Oreo", "Smokey", "Gizmo", "Luna", "Simba", "Angel", "Charlie", "Tiger", "Jack", "Lily", "Peanut", "Toby", "Loki", "Baby", "Midnight", "Princess", "Harley", "Missy", "Sophie", "Zoe", "Coco", "Milo", "Nala", "Oscar", "Rocky", "Max", "Pepper", "Sasha", "Kiki", "Mittens", "Patches", "Bailey", "Buddy", "Callie", "Misty", "Pumpkin", "Garfield", "George", "Lucky", "Maggie", "Sebastian", "Simon", "Bandit", "Boots", "Cali", "Sammy", "Sassy", "Tucker", "Dexter", "Felix", "Jake", "Phoebe", "Precious", "Romeo", "Snickers", "Socks", "Daisy", "Fiona", "Lola", "Sadie", "Sox", "Blackie", "Casper", "Ginger", "Gracie", "Lilly", "Marley", "Sweetie", "Belle", "Chester", "Fluffy", "Frankie", "Minnie", "Muffin", "Murphy", "Scooter", "Batman", "Boo", "Izzy", "Jasmine", "Mimi", "Rusty", "Sugar", "Ziggy", "Cupcake", "Dusty", "Leo", "Noodle", "Panda", "Salem", "Zeus"]; // lol I found 100 cat names on the internet
	var rand = Math.floor(Math.random() * names.length);
	return names[rand];
}

function catColors()
{
	var colors = ["Hazel", "Black", "White", "Amber", "Silver", "Ginger", "Tabby"];
	var n = Math.floor(Math.random() * 3) + 1;
	var res = [];
	for (var i = 0; i < n; i++)
	{
		var r = Math.floor(Math.random() * colors.length);
		res.push(colors[r]);
		colors.splice(r, 1);
	}
	return res;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cats/new', function(req, res, next) {
  var myAge = Math.floor(Math.random() * 100) + 1;
  var myName = randomName();
  var myColors = catColors();
  var cat = new Cat({age: myAge, name: myName, colors: myColors})
  cat.save(function (err) {
    if (err) {console.log("Problem saving", err);}
  });
  res.render('newcat', cat);
});

router.get('/cats/delete/old', function(req, res, next) {
  // Perfect mongoose sorting in action
  var query = Cat.find().sort({age: -1}).limit(1);
  query.exec(function(err, maxResult){

    if (err) {return err;}
    maxResult[0].remove(function(err, result) {

    // Handle Errors with helper func
     // function errorHandler(err, req, res, next) {
     //   res.status(500);
     //   res.render('error', { error: err });
     // }
      if (err) {return err;}
      res.render('killedcat', maxResult[0]);
    });
  });
});

router.get('/cats/bycolor/:color', function(req, res, next) {
  var myColor = req.params.color;
  myColor = myColor.toLowerCase();
  myColor = myColor.charAt(0).toUpperCase() + myColor.slice(1);
  Cat.find({colors: myColor}).sort({age: 1}).exec(function(err, cats) {
    res.render('cats', {'cats': cats});
  });
});

// Like it like it
router.get('/cats/kittens', function(req, res, next) {
  Cat.find({age: {$lt: 10}}).sort({age: 1}).exec(function(err, cats) {
    res.render('cats', {'cats': cats});
  });
});

router.get('/cats', function(req, res, next) {
  Cat.find().sort({age: 1}).exec(function(err, cats) {
    res.render('cats', {'cats': cats});
  });
});

module.exports = router;

