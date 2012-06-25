
/*
 * REST hooks for articles
 */

exports.create = function(req, res){
	res.render('todo', { feature: 'Create Article' })
};

exports.update = function(req, res){
	res.render('todo', { feature: 'Update Article' })
};

exports.delete = function(req, res){
	res.render('todo', { feature: 'Delete Article' })
};

exports.view = function(req, res){
	res.render('todo', { feature: 'View Specific Article' })
};

exports.list = function(req, res){
	res.render('todo', { feature: 'List Articles' })
};