const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {

    let data;
    try{
        data = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec();
    } catch (err) {
        console.log("error", err);
    }

    return res.json(200, {
        message: "List of posts",
        post: data
    })
}

module.exports.destroy = async function(req, res){
    let post;
    try{
        post = await Post.findById(req.params.id);
        if(post.user == req.user.id) {
            await Post.deleteOne({_id: req.params.id});
            await Comment.deleteMany({post: req.params.id});
            return res.json(200, {
                message: "Post and assosicated comments deleted successfully"
            });
        }
        else {
            return res.json(401, {
                message: "You cannot delete this Post"
            });
        }
    } catch(err) {
        console.log("******* Error in deleting post", err);
        return res.json(500, {
            message: "Internal server error"
        })
    }
}