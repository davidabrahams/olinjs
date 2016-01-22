var http = require('http');
var bl = require('bl');
var url_1 = process.argv[2];
var url_2 = process.argv[3];
var url_3 = process.argv[4];
var results = new Array(3);
var callbacks = 0;

function callback (index, s) {
	callbacks += 1;
	results[index] = s;
	if (callbacks === 3)
	{
		results.forEach(function(res) {
			console.log(res);
		});
	}
}

http.get(url_1, function (respose) {
	respose.pipe(bl(function (err, data) {
		callback(0, data.toString());
	}));
});

http.get(url_2, function (respose) {
	respose.pipe(bl(function (err, data) {
		callback(1, data.toString());
	}));
});

http.get(url_3, function (respose) {
	respose.pipe(bl(function (err, data) {
		callback(2, data.toString());
	}));
});
