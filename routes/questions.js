
/*
 * REST hooks for questions
 */

exports.create = function(req, res){
	res.render('todo', { feature: 'Create Question' })
};

exports.update = function(req, res){
	res.render('todo', { feature: 'Update Question' })
};

exports.delete = function(req, res){
	res.render('todo', { feature: 'Delete Question' })
};

exports.view = function(req, res){
	res.render('todo', { feature: 'View Question' })
};

exports.list = function(req, res){
	res.render('todo', { feature: 'List Questions' })
};