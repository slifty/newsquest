
/**
 * Module dependencies.
 */

var express = require('express'),
	articles = require('./routes/articles.js'),
	questions = require('./routes/questions.js'),
	pages = require('./routes/pages.js')

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
app.get('/', pages.index);
app.get('/about', pages.about);
app.get('/demo', pages.demo);
app.get('/team', pages.team);


// REST: Related Articles
app.get('/api/article', articles.view); // View
app.get('/api/articles', articles.list); // List
app.post('/api/articles', articles.create); // Add
app.put('/api/article', articles.update); // Update
app.delete('/api/article', articles.delete); // Delete

// REST: Questions
app.get('/api/question', questions.view); // View
app.get('/api/questions', questions.list); // List
app.post('/api/questions', questions.create); // Add
app.put('/api/question', questions.update); // Update
app.delete('/api/question', questions.delete); // Delete

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});