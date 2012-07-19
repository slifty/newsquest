
/**
 * Module dependencies.
 */

var config = require('./config'),
	express = require('express'),
	mongoose = require('mongoose'),
	article_routes = require('./routes/articles'),
	question_routes = require('./routes/questions'),
	page_routes = require('./routes/pages'),
	Article = require('./models/article'),
	Question = require('./models/question'),
	Event = require('./models/event');

var app = module.exports = express.createServer();

// Database Action
mongoose.connect(config.mongo.base, function(err) {
	if (err) throw err;
});

// Configuration
app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	app.enable("jsonp callback");
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});



// Pages
app.get('/about', page_routes.about);
app.get('/demo', page_routes.demo);
app.get('/team', page_routes.team);


// REST: Related Articles
app.get('/api/article/:id', article_routes.view); // View
app.get('/api/articles', article_routes.list); // List
app.post('/api/articles', article_routes.create); // Add
app.post('/api/articles/:id', article_routes.create); // Load Related Articles
app.put('/api/article/:id', article_routes.update); // Update
app.delete('/api/article/:id', article_routes.delete); // Delete

// REST: Questions
app.get('/api/question/:id', question_routes.view); // View
app.get('/api/questions', question_routes.list); // List
app.post('/api/questions', question_routes.create); // Add
app.put('/api/question/:id', question_routes.update); // Update
app.put('/api/question/:id/view', question_routes.view); // Register a view
app.put('/api/question/:id/skip', question_routes.skip); // Register a skip
app.delete('/api/question/:id', question_routes.delete); // Delete

app.listen(3000, function(){
	console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});