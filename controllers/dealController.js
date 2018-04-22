var mongoose = require('mongoose');
var dealModel = require('../models/deals');

exports.deals_list = function(req, res){
    dealModel.find({}, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    });
}

exports.add_deal = function(req, res){
    var newDeal = new DealModel(req.body);
    newDeal.save(function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.statusCode = 201;
            res.json(docs);
        }
    })
}

exports.single_deal = function(req, res){
    dealModel.findById(req.params.dealId, function(err, doc){
        if(err){
            res.send(err);
        }else{
            res.statusCode = 200;
            res.json(doc);
        }
    })
}

exports.update_deal = function(req, res){
    dealModel.findByIdAndUpdate(req.params.dealId, req.body, {upsert: true}, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    })

}

exports.delete_restaurant = function(req, res){
    dealModel.findByIdAndRemove(req.params.restId, function(err, docs){
        if(err){
            res.send(err);
        }else{
            res.json(docs);
        }
    })
}
