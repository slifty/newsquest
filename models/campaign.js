var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Mixed = Schema.Types.Mixed;

var Article = require('./article');

// Schema
var Campaign = new Schema({
	title : { type: String },
	articles : [Article.schema],
	timestamp : { type: Date }
});


// Middelware
Event.pre('init', function(next) {
	next();
});

Event.pre('save', function(next) {
	next();
});

Event.pre('remove', function(next) {
	next();
});


// Exports
mongoose.model('Campaign', Event);
exports.schema = Event;
exports.model = mongoose.model('Campaign');