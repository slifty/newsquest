var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	url = require('url');
	
var Question = require('./question');


// Schema
var Article = new Schema({
	url : { type: String, default: ""},
	title : { type: String, default: ""},
	source : { type: String, default: ""},
	meta: {
		published : { type: Date },
		author : { type: String },
	},
	paragraphs : [String],
	related_articles: [String]
});


// Middelware
Article.pre('init', function(next) {
	next();
});

Article.pre('save', function(next) {
	
	next();
});

Article.pre('remove', function(next) {
	next();
});


// Methods
exports.splitParagraphs =  function(text) {
	return text.replace(/<br\s*\/?>/g,"\n").replace(/(\s*\n\s*)+/g,"\n").split(/\n/);
};

// Exports
mongoose.model('Article', Article);
exports.schema = Article;
exports.model = mongoose.model('Article');