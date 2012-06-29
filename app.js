
/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	article_routes = require('./routes/articles.js'),
	question_routes = require('./routes/questions.js'),
	page_routes = require('./routes/pages.js'),
	Article = require('./models/article.js'),
	Question = require('./models/question.js'),
	Event = require('./models/event.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});


// Pages
app.get('/', page_routes.index);
app.get('/about', page_routes.about);
app.get('/demo', page_routes.demo);
app.get('/team', page_routes.team);


// REST: Related Articles
app.get('/api/article', article_routes.view); // View
app.get('/api/articles', article_routes.list); // List
app.post('/api/articles', article_routes.create); // Add
app.put('/api/article', article_routes.update); // Update
app.delete('/api/article', article_routes.delete); // Delete

// REST: Questions
app.get('/api/question', question_routes.view); // View
app.get('/api/questions', question_routes.list); // List
app.post('/api/questions', question_routes.create); // Add
app.put('/api/question', question_routes.update); // Update
app.delete('/api/question', question_routes.delete); // Delete

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});