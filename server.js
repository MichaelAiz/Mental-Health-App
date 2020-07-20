const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users')

const app = express();

app.use(express.json());

// DB Config 
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log("mongoDB Connected"))
    .catch(err => console.log(err));

// Use Routes

app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server started on port 5000"));



