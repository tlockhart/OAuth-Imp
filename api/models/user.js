const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Assign a serial string type to mongoose _id
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
                type: String ,
                required: true,
                unique: true,
                match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        }, 
    password: {
        type: String, 
        required: true 
    },
    role: {
        type: String, 
        required: true,
        default: "visitor" 
    },
    date: {
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      }
});

const User = mongoose.model('User', userSchema);

module.exports = User;