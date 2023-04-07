const Post = require('../models/post');

module.exports.home = async function(req, res){
    let data;
    try{
        data = await Post.find({}).populate('user').exec();
        return res.render('home', {
            title: 'Home',
            posts: data
        });
    } catch(err){
        return res.redirect('/');
    }
};