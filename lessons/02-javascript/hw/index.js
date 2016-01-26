var server = require('./server');
var router = require('./router');
var requestHanders = require('./requestHandlers');


var handle = {};
handle["/"] = requestHanders.start;
handle["/start"] = requestHanders.start;
handle["/upload"] = requestHanders.upload;

server.start(router.route, handle);
