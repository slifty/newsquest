var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	url = require('url');
	
var Question = require('./question');


// Setters
function cleanURL(u) {
	var uo = url.parse(u);
	return uo.protocol + "//" + uo.host + uo.path;
}
function splitParagraphs(text) {
	return text.replace(/<br\s*\/?>/g,"\n").replace(/(\s*\n\s*)+/g,"\n").split(/\n/);
}


// Schema
var Article = new Schema({
	url : { type: String },
	title : { type: String },
	source : { type: String },
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


// Exports
mongoose.model('Article', Article);
exports.schema = Article;
exports.model = mongoose.model('Article');
exports.cleanURL = cleanURL;
exports.splitParagraphs = splitParagraphs;