// this file creates connection
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/excellence", {
useUnifiedTopology: true,
useNewUrlParser: true,
}).then(() => console.log('DB Connected!'))
.catch(error => {
    console.log(Error, error.message);
});

const Candidate = require("../models/candidate");
const TestScore = require("../models/test_score");

module.exports = {Candidate, TestScore};