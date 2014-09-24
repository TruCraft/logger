require('colors');

function logger(logFile, date){
	this.logFile = logFile;
	if(date !== undefined) {
		this.date = date;
	} else {
		this.date = false;
	}
}

var p = logger.prototype;
var fs = require('fs');

p.error = function(msg){
	msg = this.buildMsg("ERROR: "+msg.toString());
	console.log((msg).red);
	this.append(msg);
}

p.info = function(msg){
	msg = this.buildMsg("INFO: "+msg.toString());
	console.log((msg).cyan);
	this.append(msg);
}

p.warning = function(msg){
	msg = this.buildMsg("WARNING: "+msg.toString());
	console.log((msg).yellow);
	this.append(msg);
}

p.success = function(msg){
	msg = this.buildMsg("SUCCESS: "+msg.toString());
	console.log((msg).green);
	this.append(msg);
}

p.chat = function(msg){
	msg = this.buildMsg("CHAT: "+msg.toString());
	console.log((msg).magenta);
	this.append(msg);
}

p.add = function(msg){
	msg = this.buildMsg(msg.toString());
	console.log((msg).grey);
	this.append(msg);
}

p.append = function(msg)
{
	fs.appendFile(this.logFile, msg+"\n", function (err) {
		if (err) throw err;
	});
}

p.buildMsg = function(msg) {
	if (this.date) {
		var date = new Date();
		msg = date.toJSON() + " :: " + msg.toString();
	}
	return msg;
}

module.exports = logger;