var express = require('express');
var router = express.Router();
var restModel = require('../models/restaurants');
var userModel = require('../models/user');
var likeModel = require('../models/likes');
var commentModel = require('../models/comments');

router.get('/addRestaurant', ensureAuthenticated, function(req, res){
	res.render('add_restaurant', {pageHeader:'Add New Deal'});
});

router.post('/addRestaurant', ensureAuthenticated, async function(req, res){
	try{
		await restModel.addRestaurant(req, res);
		req.flash('success_msg', 'Restaurant has been added successfully.');

		return res.redirect('/restaurants/viewRestaurants');
	}catch(err){
		console.log(err);
	}
})

//update restaurant 
router.get('/editRestaurant/:id', ensureAuthenticated, async function(req, res){
	let id = req.params.id;
	console.log('rest id is '+ id);
	try{
		let docs = await restModel.getRestaurant(id);
		console.log('editing' + docs);
		res.render('add_restaurant', {rest: docs, pageHeader:'Add New Deal'});
	}catch(err){
		console.log(err)
	}
})


router.post('/editRestaurant/:id', ensureAuthenticated, async function(req, res){
	try {
		await restModel.updateRestaurant(req.params.id, req, res);
		req.flash('success_msg', 'Restaurant has been updated successfully.');

		return res.redirect('/restaurants/viewRestaurants')
	} catch (err) {
		console.log(err)
	}

})

//delete restaurant
router.post('/deleteRestaurant/:id', ensureAuthenticated, async function(req, res){
	try{
		console.log('delete.............')
		await restModel.deleteRestaurant(req.params.id, req, res);
		req.flash('success_msg', 'Restaurant has been deleted successfully.');
		 res.send('done')
	}catch(err){

	}
})

//get single restaurant
router.get('/getRestaurant/:id', ensureAuthenticated, async function(req, res){
	try{
		if(req.params.id != null){
		  let docs = await restModel.getRestaurant(req.params.id);
		  let commentDoc = await commentModel.getAllComments(req.params.id);
		  console.log("comment docs-------------------- "+commentDoc);
		  //createbyName
		for(let i = 0; i < commentDoc.length; i++){
				let createdByName = await userModel.find({_id: commentDoc[i].commentedbyid}, {name : 1});
				commentDoc[i].createdByName = createdByName[0].name;
			}
		  res.render('rest_detail', {rest: docs, pageHeader:'Restaurant Detail', comments: commentDoc});
		}
	}catch(err){
		console.log(err);
	}
})

router.get('/viewRestaurants', ensureAuthenticated, async function(req, res){
	try{
		var docs = await restModel.getAllRestaurant(req, res);
		//createbyName
		// for(let i = 0; i < docs.length; i++){
		// 	let likeCount = await likeModel.likeCounts(docs[i]._id, req, res);
		// 	docs[i].likeCounting = likeCount;
		// 	let check = await likeModel.checkLikes(docs[i]._id, req, res)
			
		// 	if(check.length>0){
		// 		docs[i].liked = true;
		// 		docs[i].likeid = check[0]._id;
		// 	}else{
		// 		docs[i].liked = false;
		// 	}
		//	}
		res.render('view_restaurants', {rests : docs});
		console.log(docs);
	}catch(err){
		console.log(err);
	}
})

//like restaurant
router.get('/likeRest/:restid', ensureAuthenticated, async function(req, res){
	try{
		await likeModel.like(req.params.restid, req, res);
		//req.flash('success_msg', 'Restaurant has been added successfully.');

		return res.redirect('/restaurants/viewRestaurants');
	}catch(err){
		console.log(err);
	}
})

//unlike restaurant
router.get('/unlikeRest/:id', ensureAuthenticated, async function(req, res){
	try{
		console.log('unliking')
		await likeModel.unlike(req.params.id, req, res);
		//req.flash('success_msg', 'Restaurant has been added successfully.');

		return res.redirect('/restaurants/viewRestaurants');
	}catch(err){
		console.log(err);
	}
})

//comment
router.post('/addComment', ensureAuthenticated, async function(req, res){
    try{
		await commentModel.addComment(req.body.restid, req, res, "restaurant");
		req.flash('success_msg', 'Comment has been added successfully.');

		return res.redirect(`/restaurants/getRestaurant/${req.body.restid}`);
	}catch(err){
		console.log(err);
	}
})


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;