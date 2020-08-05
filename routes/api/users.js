const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require('../../config/keys').secret
const {body, validationResult} = require('express-validator');
// User Model
const User = require('../../models/User');


// @route POST api/users/register
// @desc Register a new user
// @access Public 
router.post('/register', [
    body('name').not().isEmpty().withMessage('Name mus not be empty'),
    body('email').not().isEmpty().withMessage('Email must not be empty'),
    body('password').not().isEmpty().withMessage("Password must not be empty"),
    body('passwordConfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords must match');
        }
        return true;
    })
    ],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors: errors.array()})
    }
    const { name, email, password} = req.body;
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: "email is taken"});
            
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                quotes: req.body.quotes
            })
            //Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                {id: user.id},
                                secret,
                                { expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email,
                                            quotes: user.quotes
                                        }
                                    })
                                }
                            )
                        })
                        .catch(err => console.log(err));
                })
            })
        })
})

//@route post api/users/login
//@desc allows user to login
//access Public

router.post('/login', (req, res) => {
    const { email, password} = req.body;
    if( !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    //Check for existing user 
    User.findOne({email})
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
                    jwt.sign(
                        {id: user.id},
                        secret,
                        { expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email,
                                    quotes: user.quotes
                                }
                            })
                        }
                    )
                })
        })

    })



// @route GET api/users
// @desc get all users
// @access Public

module.exports = router;