var logger = require('./');

var options1 = {
	file: __dirname + "/log1.txt",
	date: true,
	print: true,
	log_level: ["success", "error"],
	prefix: "log1"
};

var options2 = {
	date: true,
	print: true,
	prefix: "log2"
};

var myLog1 = new logger(options1);
var myLog2 = new logger(options2);

myLog1.error("This is an error");
myLog1.info("This is an info");
myLog1.warning("This is a warning");
myLog1.chat("This is a chat");
myLog1.success("This is a success");

myLog2.error("This is an error");
myLog2.info("This is an info");
myLog2.warning("This is a warning");
myLog2.chat("This is a chat");
myLog2.success("This is a success");