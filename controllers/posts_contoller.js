const Post = require("../models/post");
const Comment = require("../models/comment")

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

module.exports.destroy = async function(req, res){
    let post;
    try{
        post = await Post.findById(req.params.id);
    } catch(err) {
        console.log("Error Finding Post");
    }
    console.log("abc ", post);
    if(post.user == req.user.id){
        await Post.deleteOne({_id: req.params.id});
        try{
            await Comment.deleteMany({post: req.params.id});
        } catch(err) {
            console.log("Error deleting comments");
        }
        return res.redirect('back');
    } else {
        return res.redirect('back');
    }
}