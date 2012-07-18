var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var Article = require('./article');

// Schema
var Question = new Schema({
	article : { type: String },
	question : { type: String },
	answer : { type: String },
	skip_count : { type: Number, min: 0 },
	view_count : { type: Number, min: 0 },
	weight : { type: Number }
});


// Middelware
Question.pre('init', function(next) {
	next();
});

Question.pre('save', function(next) {
	// TODO: make sure the question doesn't already exist
	next();
});

Question.pre('remove', function(next) {
	next();
});


// Exports
mongoose.model('Question', Question);
exports.schema = Question;
exports.model = mongoose.model('Question');