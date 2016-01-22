var net = require('net');
var strftime = require('strftime');

var server = net.createServer(function callback (socket) {
	var s = strftime('%F %H:%M') + '\n';
	socket.end(s);
});

server.listen(+process.argv[2])
