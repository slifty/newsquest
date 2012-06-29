var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	
var Question = require('./question.js');

var Article = new Schema({
	url : String,
	title : String,
	source : String,
	meta: {
		published : Date,
		author : String,
	},
	body : String,
	questions : [Question.schema],
	related_articles: [String]
});

exports.schema = Article;