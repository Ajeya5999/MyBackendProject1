const User = require('../models/user');

module.exports.profile = async function(req, res){
    let user;
    try {
        user = await User.findById(req.params.id);
    } catch(err){
        console.log("Cannot get user", err);
    }
    return res.render('user_profile', {
        title: 'Profile Page',
        profile_user: user
    });
};

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err) {
                if(err) {
                    console.log('Multer Error:', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file) {
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } catch(err) {
            req.flash('error', err);
            console.log("Cannot update user", err);
            return res.redirect('back');
        }
    } else {
        req.flash('error', 'Unauthorized')
        return res.status(401).send('Unauthorized');
    }
}

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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
};

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if (err) { 
            console.log(err);
            return;
        }
        req.flash('success', 'You have been logged out');
        return res.redirect('/');
    })
};