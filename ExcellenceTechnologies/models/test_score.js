const mongoose = require('mongoose');

var testScoreSchema = new mongoose.Schema({

    name : {
        type: String,
        required : 'required'
    },
    email : {
        type : String,
        required: 'required'
    },
    first_round : {
        type : Number,
        default : 0
    },
    second_round : {
        type : Number,
        default : 0
    },
    third_round : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model("test_score", testScoreSchema);