var fs = require('fs');

function callBack (err, list)
{

	for (var i = 0; i < list.length; i++)
	{
		// console.log(list[i]);
		if (list[i].indexOf('.') !== -1 && list[i].split('.').pop() ===
		    process.argv[3])
		{
			console.log(list[i]);
		}
	}
}

fs.readdir(process.argv[2], callBack);
