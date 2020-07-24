const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');




//@route get api/protected/quote/get-all
//desc gets users quotes
//access Protected
router.get('/quote/get-all', (req, res) => {
    user = req.user;
    res.json(user.quotes);
})


//@route post api/protected/quote/add
//desc adds a new quote
//access Protected 
router.post('/quote/add', (req, res) => {
    user=req.user;
    quoteText = req.body.quote;
    user.quotes.push({"text": quoteText});
    user.save();

    res.json(user.quotes);
    
})

//@route post api/protected/quote/delete
// desc deletes a quote
//access Protected
router.post('/quote/delete',(req, res) => {
    user = req.user;
    quoteID = req.body.id;
    user.quotes.id(quoteID).remove();
    user.save();
    res.json(user.quotes);
})

module.exports = router;