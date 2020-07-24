const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuoteSchema = new Schema ({
    text: {
        type: String,
        required: true,
    }
})



const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    quotes: [QuoteSchema]
})

module.exports = User = mongoose.model('user', UserSchema);