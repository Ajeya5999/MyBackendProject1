const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'Profile Page'
    });
};

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
};

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render('user_sign_in', {
        title: 'Sign in'
    });
};

module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    let user;
    try{
        user = await User.findOne({email: req.body.email})
    } catch(err){
        console.log("Error in signing up");
        return;
    }
    if(!user){
        try{ 
            let data = await User.create(req.body);
            return res.redirect('/users/sign-in');
        } catch(err){
            console.log("Error in creating user");
            return;
        }    
    }
    else{
        console.log("User already exists");
        return res.redirect('back');
    }
};

module.exports.createSession = function(req, res){
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if (err) { 
            console.log(err);
            return;
        }
        return res.redirect('/');
    })
};