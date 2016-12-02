var fs = require('fs');

var LogSvc = function(logFile) {

	this.logFile = logFile,

	this.log = function(text) {

		fs.appendFile(this.logFile, text, function(err) {
			if (err) {
				console.log(err);
			}
		});

	}

}

exports.LogSvc = LogSvc;