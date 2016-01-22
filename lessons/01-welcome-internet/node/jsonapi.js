var fs = require('fs');
var http = require('http');
var url = require('url');

var server = http.createServer(function callback (request, response) {
	var parsedUrl = url.parse(request.url, true);

	if (/^\/api\/unixtime/.test(request.url))
	{
		var obj = {
			unixtime: (new Date(parsedUrl.query.iso)).getTime()
		}
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(obj))
	}
	else if (/^\/api\/parsetime/.test(request.url))
	{
		var date = new Date(parsedUrl.query.iso);

		var obj = {
			hour: date.getHours(),
			minute: date.getMinutes(),
			second: date.getSeconds()
		}
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(obj))
	}
});

server.listen(+process.argv[2])
