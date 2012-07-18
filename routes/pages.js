var Article = require('../models/article').model,
	Question = require('../models/question').model,
	Event = require('../models/event').model;

/*
 * Primary pages
 */

exports.index = function(req, res) {
	res.render('page', { title: 'Home' })
};

exports.team = function(req, res) {
	res.render('page', { title: 'About' })
};

exports.demo = function(req, res) {
	Article.findById(req.params["id"], function (err, doc){
		res.json(doc);
	});
};

exports.team = function(req, res) {
	res.render('page', { title: 'Team' })
};