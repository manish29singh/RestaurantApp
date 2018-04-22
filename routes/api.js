  var express = require('express');
  var restController = require('../controllers/restaurantController');
  var userController = require('../controllers/userController');
  var router = express.Router()
  var jwt = require('jsonwebtoken');


  //login router
  router.post('/login', async function(req, res){
    await userController.user_login(req, res);
  })
 
  // restaurants Routes
  //get all 

  router.get('/restaurants', verifyToken,  function(req, res){
    jwt.verify(req.token, 'secretkey', async function(err, data){
      if(err){
        res.send(err);
      }else{
      await restController.restuarant_list(req, res);
      }
    })
  })

  //add new one
  router.post('/restaurants', verifyToken,  function(req, res){
    jwt.verify(req.token, 'secretkey', async function(err, data){
      if(err){
        res.send(err);
      }else{
       await restController.add_restaurant(req, res);
      }
    })
  })

  //get one
  router.get('/restaurants/:restId', verifyToken, function(req, res){
    jwt.verify(req.token, 'secretkey', async function(err, data){
      if(err){
        res.send(err);
      }else{
       await restController.single_restaurant(req, res);
      }
    })
  })

  //update one
  router.put('/restaurants/:restId', verifyToken, function(req, res){
    jwt.verify(req.token, 'secretkey', async function(err, data){
      if(err){
        res.send(err);
      }else{
      await  restController.update_restaurant(req, res);
      }
    })
  })

  //delete one
  router.delete('/restaurants/:restId', verifyToken, function(req, res){
    jwt.verify(req.token, 'secretkey', async function(err, data){
      if(err){
        res.send(err);
      }else{
      await restController.delete_restaurant(req, res);
      }
    })
  })

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;