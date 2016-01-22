var fs = require('fs');

function callBack (err, data)
{
	var array = data.split('\n');
	console.log(array.length - 1);
}

fs.readFile(process.argv[2], 'utf8', callBack);
