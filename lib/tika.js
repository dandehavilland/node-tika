var util   = require('util'),
    events = require('events'),
    exec = require('child_process').exec;

module.exports = Tika;

function Tika() {
  events.EventEmitter.call(this);
}

// inherit events.EventEmitter
Tika.super_ = events.EventEmitter;

Tika.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
  value: Tika,
  enumerable: false
}
});

Tika.prototype.parse = function(fileName) {
	var that = this;
	exec('java -jar ' + __dirname + '/tika-app-1.2.jar -t ' + fileName, function(err, stdout, stderr) {
		if (err || stderr) {
			that.emit('error', err || stderr);
			return;
		}

		that.emit('text', stdout);
	});

	return that;
};

