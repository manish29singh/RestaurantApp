var mongoose = require('mongoose');
var RestaurantModel = mongoose.model('Restaurant');

exports.restuarant_list = function(req, res){
    RestaurantModel.find({}, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    });

}

exports.add_restaurant = function(req, res){
    var newRest = new RestaurantModel(req.body);
    newRest.save(function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.statusCode = 201;
            res.json(docs);
        }
    })
}

exports.single_restaurant = function(req, res){
    RestaurantModel.findById(req.params.restId, function(err, doc){
        if(err){
            res.send(err);
        }else{
            res.statusCode = 200;
            res.json(doc);
        }
    })
}

exports.update_restaurant = function(req, res){
    RestaurantModel.findByIdAndUpdate(req.params.restId, req.body, {upsert: true}, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    })

}

exports.delete_restaurant = function(req, res){
    RestaurantModel.findByIdAndRemove(req.params.restId, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    })
}
