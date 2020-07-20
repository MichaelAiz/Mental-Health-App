const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');

// creates object literal to store options detailing how jwt token should be extracted 
const opts = {};

opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

passport.use(new JwtStrategy(opts, ))


