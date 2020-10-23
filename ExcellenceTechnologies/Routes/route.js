const { error } = require('console');
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const { DefaultDeserializer } = require('v8');
const candidate = require('../models/candidate');
const CandidateModel = mongoose.model('candidate');
const TestScoreModel = mongoose.model('test_score');


// Insert a candidate into database
router.post("/", (req, res) => {

    // validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Insufficient Data Provided"
        });
    }

    var new_candidate = new CandidateModel();
    new_candidate.name = req.body.name;
    new_candidate.email = req.body.email;
    new_candidate.save((error, user) => {
        if (!error){
            var testscore = new TestScoreModel();
            testscore.name = new_candidate.name;
            testscore.email = new_candidate.email;
            testscore.save((error, saved) => {
                if (error){
                    res.send(error);
                }
            });

            res.send(new_candidate.name + " added successfully!");
        } else {
            res.send(error);
        }
    });
});


// Assign score for a candidate based on the test
router.put("/", (req, res) => {

    // If request body is empty
    if (!req.body) {
        return res.status(400).send({
            message: "email can not be empty"
        });
    }

    // update records where email is primary key
    TestScoreModel.updateOne(
        {
            email : req.body.email
        },{
            first_round : req.body.first_round,
            second_round : req.body.second_round,
            third_round : req.body.third_round
        }, 
        (error, data) => {
            if (!error){
                res.send("Test Score Updated Successfully!")
            } else {
                res.send(error)
            }
        });

});


// Api to get highest scoring candidate and average scores per round for all candidates
router.get("/", (req, res) => {

    // get average score of all three rounds for every candidate
    TestScoreModel.aggregate([
        {
        $project : {name: "$name" , email: "$email", average : { $avg : ["$first_round", "$second_round", "$third_round"]}}
        }
    ]).exec((error, records) => {
        if (!error){

            var MaximumScore = 0;
            var HighestScore = {};
            var avgScores = [];
            records.forEach(candidate => {

                // store maximum score in HighestScore
                if (MaximumScore < candidate.average){
                    MaximumScore = candidate.average;

                    HighestScore.name = candidate.name;
                    HighestScore.email = candidate.email;
                    HighestScore.MaximumScore = candidate.average;
                }
                
                avgScores.push({
                    name : candidate.name,
                    email : candidate.email, 
                    average: candidate.average
                });
            });

            
            res.send({HighestScore, avgScores});
        } else {
            res.send(error);
        }
    });
});


module.exports = router;

