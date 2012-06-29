var mongoose = require('mongoose'),
	Schema = mongoose.Schema

var Question = new Schema({
	question : String,
	answer : String,
	skip_count : Number,
	view_count : Number
});

exports.schema = Question;