var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

function Cat(age, name, colors)
{
	var cat = {
		name: name,
		age: age,
		colors: colors,
	}
	return cat;
}

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
	var age = Math.floor(Math.random() * 100);
	var name = randomName();
	var colors = catColors();

	console.log(age);
	console.log(name);
	console.log(colors);
});

module.exports = router;
