const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const secret = require('../../config/keys').secret
const {body, validationResult} = require('express-validator');
// User Model
const User = require('../../models/User');
const { default: validator } = require('validator');


// @route POST api/users/register
// @desc Register a new user
// @access Public 
router.post('/register', [
    body('name').not().isEmpty().withMessage('Please Enter a Name'),
    body('email').not().isEmpty().withMessage('Please Enter an Email'),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').not().isEmpty().withMessage("Please Enter a Password"),
    body('passwordConfirm').custom((value, {req}) => {
        if (value !== req.body.password) {
            console.log(value);
           throw new Error(`value is ${req.body.passwordConfirm}`);
        } 
        return true;
        console.log('bye');
    }),
    body('email').custom((value, {req}) => {
        return User.findOne({email: value}).then(user => {
            if(user) {
                throw new Error(`Email is in use`);
            }
        })
    }),
    ],(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors: errors.array()})
    }
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


//@route post api/users/login
//@desc allows user to login
//access Public

router.post('/login', [
    body('email').not().isEmpty().withMessage("Please Enter an Email"),
    body('email').isEmail().withMessage("Please Enter a proper Email"),
    body('password').not().isEmpty().withMessage('Please Enter a Password'),
    body('email').custom((value) => {
        return User.findOne({email: value}).then(user => {
            if(!user) {
                return Promise.reject(`User Not Found ${value}`)
            }
        })
    }),
], (req, res) => {
    const { email, password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return res.status(400).json({errors: errors.array()})
    }

    //Check for existing user 
        User.findOne({email})
            .then((user) => {
                bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if(!isMatch) return res.status(400).json({errors: [{msg: 'Invalid credentials', param: "general"}]});
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