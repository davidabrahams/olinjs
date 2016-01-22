var http = require('http')

var url = process.argv[2];

http.get(url, function callback (respose) {
	respose.setEncoding("utf8");
	respose.on("data", function (data) {
		console.log(data)
	});

});
