var mongoose = require('mongoose');
var userModel = require('../models/user');
var userModel = require('../models/user');
var jwt = require('jsonwebtoken');

exports.user_login = function(req, res){
    userModel.findOne({username : req.body.username}, function(err, user){
        if(err){
            res.send(err);
        }
        if(!user){
            res.status(401).json({ message: 'User not found.' });
        }else if(user){
            if(!user.comparePasswordVer(req.body.password)){
                res.status(401).json({message: 'Authentication Failed. Wrong Password.'});
            }else{
                return res.json({
                    token : jwt.sign({username :user.username}, 'secretkey')
                });
            }
        }
    })

}