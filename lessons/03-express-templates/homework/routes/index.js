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

function sortedCats(cats)
{
  return cats.sort(function(a, b) {
    return a.age > b.age;
  });
}

function coloredCats(cats, color)
{
  return sortedCats(cats.filter(function (cat) {
    var b = false;
    cat.colors.forEach(function(col) {
      if (col.toUpperCase() === color.toUpperCase()) {
        b = true;
      }
    });
    return b;
  }));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/cats/new', function(req, res, next) {
  var age = Math.floor(Math.random() * 100) + 1;
  var name = randomName();
  var colors = catColors();
  var cat = Cat(age, name, colors)
  db.add(cat);
  res.render('newcat', cat);
});

router.get('/cats/delete/old', function(req, res, next) {
  var arr = db.getAll();
  // this shnazy line of code is from http://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
  var dead = db.remove(arr.reduce(function(iMin,x,i,a) {
    return x.age > a[iMin].age ? i : iMin;
  }, 0))[0];
  res.render('killedcat', dead);
});

router.get('/cats/bycolor/:color', function(req, res, next) {
  var color = req.params.color;
  var filter = coloredCats(db.getAll(), color);
  res.render('cats', {'cats': filter});
});

router.get('/cats', function(req, res, next) {
  var all = sortedCats(db.getAll());
  res.render('cats', {'cats': all});
});

module.exports = router;
