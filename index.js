var typescript = require("typestring"),
	through    = require("through");

var isTypescript, compile, typeify;

isTypescript = (function () {
	var tsReg = new RegExp("\\.ts$", "i");

	return function (file) {
		return tsReg.test(file);
	};
}());

compile = function (file, data, callback) {
	var compiled;

	try {
		compiled = typescript.compile(data.toString());
	} catch (e) {
		return callback(e);
	}

	callback(null, compiled);
};

typeify = function (file) {
	var data, stream, write, end;

	if (!isTypescript(file)) {
		return through();
	}

	data = "";
	write = function (buf) {
		data += buf;
	};

	end = function () {
		compile(file, data, function (error, result) {
			if (error) {
				stream.emit("error", error);
			}

			stream.queue(result);
			stream.queue(null);
		});
	};

	return stream = through(write, end);
};

typeify.compile = compile;
typeify.isTypescript = isTypescript;

module.exports = typeify;
