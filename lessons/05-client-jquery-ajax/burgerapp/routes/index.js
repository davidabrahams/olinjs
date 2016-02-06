var express = require('express');
var router = express.Router();
var ingredient = require('./ingredientRoutes.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/ingredients', function(req, res, next) {
//   res.render('ingredients');
// });

router.get('/ingredients', ingredient.ingredientRoutesGET);
router.post('/ingredients', ingredient.ingredientRoutesPOST);

module.exports = router;
