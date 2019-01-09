// home
'use strict';

exports.get = (req, res, next) => {

	res.locals.files = req.app.locals.htmlInput;
	res.render('index.ejs');
	
};