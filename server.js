const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users')
const protected= require('./routes/api/protected-routes')

const app = express();

app.use(express.json());

// DB Config 
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch(err => console.log(err));

//Initialize Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Use Routes

app.use('/api/users', users);
app.use('/api/protected', passport.authenticate('jwt', {session : false}), protected)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started on port 5000"));



