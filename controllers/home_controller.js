const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    let data;
    try{
        data = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec();
        let users;
        try {   
            users = await User.find({});
        } catch(err) {
            console.log("Cannot get users list", err);
        }
        return res.render('home', {
            title: 'Home',
            posts: data,
            all_users: users
        });
    } catch(err){
        return res.redirect('/');
    }
};