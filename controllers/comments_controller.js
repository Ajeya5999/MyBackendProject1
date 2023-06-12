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

module.exports.destroy = async function(req, res){
    let comment;
    try{
        comment = await Comment.findById(req.params.id);
    } catch(err) {
        console.log("error finding comment", err);
    }
    if(comment.user == req.user.id){
        let postId = comment.post;
        try{
            await comment.deleteOne({id: req.params.id});
        } catch(error) {
            console.log("error deleting comment from Comments", err);
        }
        try{
            await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
        } catch(err){
            console.log("error deleting comment from Post", err);
        }
    
    }
    return res.redirect('back');
}