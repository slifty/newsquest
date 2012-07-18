var config = require('../config'),
	http = require('http'),
	querystring = require('querystring'),
	xml = require('xml2js');

var Article = require('../models/article').model,
	Question = require('../models/question').model,
	Event = require('../models/event').model;

/*
 * REST hooks for questions
 */

exports.create = function(req, res) {
	if(req.body.a) {
		// Extract questions from an article
		Article.findById(req.body.a, function (err, article) {
			if(!article) return req.json();
			
			var post_data = querystring.stringify({
				'text' : article.paragraphs.join("\n"),
			});
			
			var options = {
				host: config.api.questions.host,
				port: 80,
				path: config.api.questions.path,
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': post_data.length
				}
			};
			
			var questions_req = http.request(options, function(questions_res) {
				questions_res.setEncoding('utf8');
				
				var question_text = '';
				questions_res.on('data', function (chunk) {
					question_text += chunk;
				});
				questions_res.on('error', function (err) {
					console.log(err);
					return res.json();
				});
				questions_res.on('end', function () {
					if(question_text == "") return res.json();
						
					var questions = [];
					var skipped_questions = 0;
					var question_strings = question_text.split("\n");
					for(var x in question_strings) {
						var parts = question_strings[x].split("\t");
						if(parts.length < 3) {
							skipped_questions++;
							continue;
						}
						
						// Create the object
						var question = new Question();
						question.article = article.id;
						question.question = parts[0];
						question.answer = parts[1];
						question.weight = parseFloat((parts.length == 3)?parts[2]:parts[3]); // Sometimes we also get a "precise answer" -- we don't care about it, but have to account for the offset.
						question.save(function (err, question) {
							if(err)
								skipped_questions++;
							else
								questions.push(question.id);
							if(questions.length == question_strings.length - skipped_questions)
								return res.json(questions);
						});
					}
					
				});
			});
			
  			questions_req.write(post_data);
			questions_req.end();
		});
	} else {
		// Make sure required fields are included
		if(!req.body["article"]) return res.json("article required");
		if(!req.body["question"]) return res.json("question required");
		if(!req.body["answer"]) return res.json("answer required");
		if(!req.body["weight"]) return res.json("weight required");
		
		// Create the object
		var question = new Question();
		question.article = req.body["article"];
		question.question = req.body["question"];
		question.answer = req.body["answer"];
		question.weight  = req.body["weight"];
		question.save(function (err, question) {
			if(err)
				return res.json(err);
			else
				return res.json(question.id);
		});
	}
};

exports.update = function(req, res) {
	res.render('todo', { feature: 'Update Question' })
};

exports.delete = function(req, res) {
	res.render('todo', { feature: 'Delete Question' })
};

exports.view = function(req, res) {
	Question.findById(req.params["id"], function (err, question){
		res.json(doc);
	});
};

exports.list = function(req, res) {
	var start = req.params["s"]?req.params["s"]:0;
	var limit = req.params["l"]?req.params["l"]:10;
	if(req.query["article"]) {
		var query = Question.find({});
		query.where('article').equals(req.query["article"]);
		query.limit(limit);
		query.skip(start);
		query.exec(function (err, questions) {
			res.json(questions);
		});
	}
	else if(req.query["articles"]) {
		var query = Question.find({});
		query.where('id').in(req.query["articles"]);
		query.limit(limit);
		query.skip(start);
		query.exec(function (err, questions) {
			res.json(questions);
		});
	} else {
		var query = Question.find({});
		query.limit(limit);
		query.skip(start);
		query.exec(function (err, questions) {
			res.json(questions);
		});
	}
};