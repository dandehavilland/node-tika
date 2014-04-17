var spawn = require('child_process').spawn;

module.exports.getText = function (filepath, cb) {
	var tika = spawn('java', ['-jar', __dirname + '/tika-app-1.5.jar', '-t', filepath]);

	// set up a variable on per instance scope for storing text
	var stdout = '';
	var stderr = '';

	tika.stdout.on('data', function (data) {
		stdout += data;
	});

	tika.stderr.on('data', function (data) {
		stderr += data;
	});

	tika.on('close', function (code) {
		if ( code !== 0 )
			cb(new Error(stderr));
		else
			cb(null, stdout);
	});
};

