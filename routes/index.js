var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('./users');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	//jwt verification
	// jwt.verify(req.token, 'secretkey', (err, authData) => {
	// 	if(err) {
	// 	  res.sendStatus(403);
	// 	} else {
	// 	  res.json({
	// 		message: 'Post created...',
	// 		authData
	// 	  });
	// 	}
	//   });

	res.render('index');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;