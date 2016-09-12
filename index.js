var colors = require('colors');

colors.setTheme({
	error: 'red',
	info: 'cyan',
	warning: 'yellow',
	success: 'green',
	chat: 'magenta',
	attention: 'white',
	add: 'grey'
});

Object.defineProperty(global, '__stack', {
	get: function() {
		var orig = Error.prepareStackTrace;
		Error.prepareStackTrace = function(_, stack) {
			return stack;
		};
		var err = new Error;
		Error.captureStackTrace(err, arguments.callee);
		var stack = err.stack;
		Error.prepareStackTrace = orig;
		return stack;
	}
});

Object.defineProperty(global, '__line', {
	get: function() {
		return __stack[1].getLineNumber();
	}
});

Object.defineProperty(global, '__function', {
	get: function() {
		return __stack[1].getFunctionName();
	}
});


function logger(options){
	if(options !== undefined) {
		this.options = options;
	} else {
		this.options = [];
	}

	if(options.log_level !== undefined) {
		this.log_level = options.log_level;
	} else {
		this.log_level = "all";
	}
}

var p = logger.prototype;
var fs = require('fs');

p.error = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.info = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.warning = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.success = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.chat = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.attention = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(func.toUpperCase() + ": " + msg.toString());
	this.append(msg, func);
}

p.add = function(msg) {
	var func = this.cleanFunctionName(__function);
	msg = this.buildMsg(msg.toString());
	this.append(msg, func);
}

p.append = function(msg, type) {
	if(this.options.print !== undefined && this.options.print) {
		if(type === undefined) {
			type = "add";
		}
		if(this.log_level == "all" || this.log_level.indexOf(type) >= 0) {
			console.log(colors[type](msg));
		}
	}

	if(this.options.file !== undefined) {
		fs.appendFile(this.options.file, msg + "\n", function(err) {
			if(err) throw err;
		});
	}
}

p.buildMsg = function(msg) {
	if (this.options.prefix !== undefined) {
		msg = this.options.prefix + " :: " + msg.toString();
	}

	if (this.options.date !== undefined) {
		var date = new Date();
		msg = date.toJSON() + " :: " + msg.toString();
	}

	return msg;
}

p.cleanFunctionName = function(func) {
	return func.substring(func.indexOf(".") + 1);
}

module.exports = logger;