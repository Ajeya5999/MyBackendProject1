const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codieal'
};

passport.use(new jwtStrategy(options, async function(jwtPayLoad, done) {
    try {
        let user = User.findById(jwtPayLoad._id);
        if(user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    } catch(err) {
        console.log("error", err);
    }
}));

module.exports = passport;