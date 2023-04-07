const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){
    let post;
    try{
        post = await Post.findById(req.body.post);
    } catch(err){
        console.log("error in finding post");
        return res.redirect('/');
    }
    if(post){
        let comment;
        try{
            comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
        } catch(error) {
            console.log("error creting comment");
            return res.redirect('/');
        }
        await post.comments.push(comment);
        await post.save();
    } 
    return res.redirect('/');
}