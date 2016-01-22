var http = require('http');
var bl = require('bl');
var url = process.argv[2];

http.get(url, function callback (respose) {
	respose.pipe(bl(function (err, data) {
		var s = data.toString();
		console.log(s.length);
		console.log(s);
	}));

});
