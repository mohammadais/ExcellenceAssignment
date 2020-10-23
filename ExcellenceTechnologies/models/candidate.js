const mongoose = require('mongoose');

var CandidateSchema = new mongoose.Schema({
    name : {
        type : String,
        required: 'required'
    },
    email : {
        type : String,
        required: 'required'
    }
});

module.exports = mongoose.model("candidate", CandidateSchema);