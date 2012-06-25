
/*
 * Primary pages
 */

exports.index = function(req, res){
	res.render('page', { title: 'Home' })
};


exports.team = function(req, res){
	res.render('page', { title: 'About' })
};

exports.demo = function(req, res){
	res.render('page', { title: 'Demo' })
};

exports.team = function(req, res){
	res.render('page', { title: 'Team' })
};