const Post = require("../models/post");

module.exports.create = async function(req, res){
    let data;
    try{
        data = await Post.create({
            content: req.body.content,
            user:req.user._id
        });
    } catch(err){
        console.log("Error while adding comment");
        return;
    }
    return res.redirect('back');
};