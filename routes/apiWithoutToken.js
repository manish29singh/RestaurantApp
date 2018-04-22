var express = require('express');
var restController = require('../controllers/restaurantController');
var userController = require('../controllers/userController');
var dealController = require('../controllers/dealController');
var router = express.Router()
var jwt = require('jsonwebtoken');


//login router
router.post('/login', async function (req, res) {
    await userController.user_login(req, res);
})

// restaurants Routes
//get all 
router.get('/restaurants', function (req, res) {
    restController.restuarant_list(req, res);
})


//add new one
router.post('/restaurants', function (req, res) {
    restController.add_restaurant(req, res);
})

//get one
router.get('/restaurants/:restId', function (req, res) {
    restController.single_restaurant(req, res);
})

//update one
router.put('/restaurants/:restId', function (req, res) {
     restController.update_restaurant(req, res);
})

//delete one
router.delete('/restaurants/:restId', function (req, res) {
     restController.delete_restaurant(req, res);
})


//deals routers
//get all deals
router.get('/deals', function(req, res){
    dealController.deals_list(req, res);
});

//add new deal
router.post('/deals', function(req, res){
    dealController.add_deal(req, res);
})

//get one
router.get('/deals/:dealId', function (req, res) {
    dealController.single_deal(req, res);
})

//update one
router.put('/deals/:dealId', function (req, res) {
    dealController.update_deal(req, res);
})

//delete one
router.delete('/deals/:dealId', function (req, res) {
    dealController.delete_deal(req, res);
})

module.exports = router;