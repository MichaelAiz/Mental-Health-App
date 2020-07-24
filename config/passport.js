const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('./keys');

// creates object literal to store options detailing how jwt token should be extracted 
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = function(passport) {
    passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err))
    }))
}


