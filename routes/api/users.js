const express= require('express');
const router =express.Router();

const gravatar = require('gravatar');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys =require('../../config/keys');
const passport =require('passport');

//load input validation
const validateRegInput =require('../../validation/register');
//load login validation
const validateLoginInput = require('../../validation/login');

//load user model

const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Test users route
// @access  Public 

router.get('/test', (req,res) => res.json({msg: "user routes"}));

// @route   GET api/users/register
// @desc    Register user
// @access  Public

router.post('/register', (req,res) =>{

    const {error, isValid} = validateRegInput(req.body);
    //check validation

    if(!isValid){
        return res.status(400).json(error);
    }

    User.findOne({email: req.body.email }).then( user =>{
        if(user) {
            error.email= 'Email already exists';
            return res.status(400).json(error);
        } else{
            const avatar = gravatar.url(req.body.email, { 
                s: 200,  //size
                r: 'pg', //rating
                d: 'mm'  //default
            });
           const newUser = new User({
               name: req.body.name,
               email: req.body.email,
               avatar,
               password: req.body.password
           }); 

           //hashing password
           bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if(err) throw err;
                    newUser.password=hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err=> console.log(err));
                })
           });

        }
    })
} );


// @route   GET api/users/login
// @desc    login user/return JWT token
// @access  Public 

router.post('/login',(req,res)=>{
    //validation
    const {error, isValid} = validateLoginInput(req.body);
    if(!isValid){
        res.status(400).json(error);
    }

    const email= req.body.email;
    const password=req.body.password;

    
    //find user by email
    User.findOne({email}).then( user => {
        if(!user){  
            error,email =' user not found';
            return res.status(400).json(user);
        }

        //check password, compare returns bool value
        bcrypt.compare(password,user.password)
        .then(is =>{
            if(is){
                //user logged in
                const payload ={ id: user.id, name: user.name ,avatar : user.avatar } //create JWT payload
                //sign token
                jwt.sign(
                    payload,
                    keys.token_key, 
                    { expiresIn: 3600 }, 
                    (err, token) => {
                        res.json({
                            success:true,
                            token: 'Bearer ' + token
                        });       
                });
            }
            else{
                error.password = ' password incorrect';
                return res.status(400).json(error);
            }
        });
    });
});

// @route   GET api/users/current
// @desc    return current user
// @access  Private

router.get('/current',passport.authenticate('jwt' ,{ session :false}), (req,res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});
module.exports= router;