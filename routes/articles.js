var config = require('../config'),
	http = require('http'),
	xml = require('xml2js'),
	url = require('url');

var Article = require('../models/article').model,
	Question = require('../models/question').model,
	Event = require('../models/event').model;

/*
 * REST hooks for articles
 */

exports.create = function(req, res) {
	if(req.body.l) {
		// Extract the article from the URL
		
		var extract_attempts = 0;
		
		var extract = function() {
			extract_attempts++;
			var options = {
				host: config.api.extraction.host,
				port: 80,
				path: config.api.extraction.path + "?url=" + req.body.l,
				method: 'GET'
			};
			
			var extract_req = http.request(options, function(extract_res) {
				extract_res.setEncoding('utf8');
				
				var extract_xml = '';
				extract_res.on('data', function (chunk) {
					extract_xml += chunk;
				});
				extract_res.on('end', function () {
					parser = new xml.Parser();
					parser.parseString(extract_xml, function (err, extract_obj) {
						if(err)
							res.json(err);
						else if(extract_obj.title === undefined) {
							console.log("Trying again");
							if(extract_attempts < 5) extract();
							else res.json();
						} else {
							// Create the object
							var article = new Article();
							article.url = req.body.l;
							article.title = extract_obj.title;
							article.source = extract_obj.domain;
							article.paragraphs = Article.splitParagraphs(extract_obj);
							article.save(function (err, article) {
								if(err)
									return res.json(err);
								else
									return res.json(article.id);
							});
						}
					});
				});
			});
			extract_req.end();
		};
		extract();
	} else if(req.params["id"]) {
		// Find and create articles related to the specified ID
		
		
	} else {
		// Create a specific article
		
		// Make sure required fields are included
		if(!req.body["url"]) return res.json("url required");
		if(!req.body["title"]) return res.json("title required");
		if(!req.body["source"]) return res.json("source required");
		if(!req.body["body"]) return res.json("body required");
		
		// Create the object
		var article = new Article();
		article.url = req.body["url"];
		article.title = req.body["title"];
		article.source = req.body["source"];
		article.paragraphs = Article.splitParagraphs(req.body["body"]);
		article.save(function (err, article) {
			if(err)
				return res.json(err);
			else
				return res.json(article.id);
		});
	}
};

exports.update = function(req, res) {
	return res.render('todo', { feature: 'Update Article' });
};

exports.delete = function(req, res) {
	res.render('todo', { feature: 'Delete Article' })
};

exports.view = function(req, res) {
	Article.findById(req.params["id"], function (err, article) {
		res.json(article);
	});
};

exports.list = function(req, res) {
	var start = req.params["s"]?req.params["s"]:0;
	var limit = req.params["l"]?req.params["l"]:10;
	
	if(req.query["url"] && !req.query["rel"]) {
		var query = Article.find({});
		query.where('url').equals(req.query["url"]);
		query.limit(limit);
		query.skip(start);
		query.exec(function (err, articles) {
			res.json(articles);
		});
	}
	else if(req.query["url"]) {
		Article.findOne({ 'url': req.query["url"]}, function(err, article) {
			var query = Article.find({});
			query.where('id').in(article.related_articles);
			query.limit(limit);
			query.skip(start);
			query.exec(function (err, articles) {
				res.json(articles);
			});
		});
	} else {
		var query = Article.find({});
		query.limit(limit);
		query.skip(start);
		query.exec(function (err, articles) {
			res.json(articles);
		});
	}
};