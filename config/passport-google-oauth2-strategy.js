const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: "483165917572-22p1t2dvptg70r0abghhr26i5tgrbmc8.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            let user = await User.findOne({email: profile.emails[0].value}).exec();
            console.log(profile);
            if(user) {
                return done(null, user);
            } else {
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
                return done(null, user);
            }
        } catch(err) {
            console.log("error", err);
            return;
        }
    }
));

module.exports = passport;