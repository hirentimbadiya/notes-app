const mongoose = require('mongoose');

const { Schema } = mongoose;

const NotesSchema = new Schema({
    // Created the below pair as a foreign key
    // find user and serve notes of that user only not of all users
    user:{
        type: mongoose.Schema.Types.ObjectId,
        // ref model taken line 25 from User.js
        ref:'user'
    },

    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes',NotesSchema);