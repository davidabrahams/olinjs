var fs = require('fs');
var path = require('path')

var result = [];

module.exports = function export_func(dirname, f_ext, cb_func) {
    fs.readdir(dirname, function (err, list) {
        if (err)
            return cb_func(err);
        list.forEach(function (file) {
         if (path.extname(file) === '.' + process.argv[3])
            result.push(file);
        })
        return cb_func(null, result);

    });
}
