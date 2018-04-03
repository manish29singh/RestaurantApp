var mongoose = require("mongoose");

//schema
var commentSchema = mongoose.Schema({
    categoryid: String,
    commentedbyid: String,
    commenttext : String, 
    type: String
});

var Comments = module.exports = mongoose.model('Comments', commentSchema);

//comment
module.exports.addComment = function(cat_id,req, res){
    return new Promise(async function(resolve, reject){
        try{
            let commentInfo = {
                categoryid :cat_id,
                commenttext:req.body.comment,
                commentedbyid : req._passport.session.user
            }

            let data = new Comments(commentInfo);
            let returnData = await data.save();
            resolve(returnData);

        }catch(err){
            reject(err);

        }
    })
}

//get all comments
module.exports.getAllComments = function(id){
    return new Promise(async function(resolve, reject){
        try{
           await Comments.find({categoryid : id }, function(err, docs){
                if(err){
                    reject(err);
                }else{
                    console.log("comment model "+docs)
                    resolve(docs);
                }
            })

        }catch(err){
            reject(err);
        }
    })
}

