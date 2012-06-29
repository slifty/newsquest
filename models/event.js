var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Mixed = Schema.Types.Mixed;

var Event = new Schema({
	type : String,
	value : Mixed,
	timestamp : Date,
	object : Mixed
});

exports.schema = Event;