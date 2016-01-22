var module = require('./module.js');

module(process.argv[2], process.argv[3], function(err, vals) {
	if (err)
		console.log('An error occurred!');
	else
	{
		vals.forEach(function(val) {
			console.log(val);
		});
		// return vals;
	}
});
