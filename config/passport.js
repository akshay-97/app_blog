const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt =require('passport-jwt').ExtractJwt;
const mongoose =require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');
const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = keys.token_key;

module.exports = passport =>{
passport.use(new JwtStrategy(opt,(jwt_payload,done)=>{
        console.log(jwt_payload);
  }));
};