var express = require('express');
var router = express.Router();
var getIngredient = require('../routes/getIngredients.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/ingredients', function(req, res, next) {
//   res.render('ingredients');
// });

router.get('/ingredients', getIngredient.getIngredientsGET);

module.exports = router;
