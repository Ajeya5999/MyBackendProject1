const User = require('../models/user');

module.exports.profile = async function(req, res){
    if(req.cookies.user_id){
        let user;
        try {
            user = await User.findById(req.cookies.user_id);
        } catch(err) {

        }
        if(user){
            return res.render('user_profile', {
                title: 'Profile Page',
                user: user
            });
        }
    } else {
        return res.redirect('/users/sign-in');
    }
};

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
};

module.exports.signIn = function(req, res){
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

module.exports.createSession = async function(req, res){
    let user;
    try{
        user = await User.findOne({email: req.body.email});
    } catch(err){
        console.log(err);
        return res.redirect('back');
    }
    if(user){
        if(user.password != req.body.password){
            console.log('Password did not match, please try again');
            return res.redirect('back');
        }
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
    } else {
        console.log('User not found, please try again');
        return res.redirect('back');
    }
};

module.exports.signOut = function(req, res){
    res.cookie('user_id', '');
    return res.redirect('back');
}