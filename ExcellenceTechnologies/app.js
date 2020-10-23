// import express 
const express = require('express');
const app = express();

// create connection to database excellence
const connection = require('./config/connection.js');

// configure for parsing request throguh postman
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());

// home page
app.get("/", (req, res) => {
    res.send("<center><h1>Excellence Technologies<h1><center><hr>");
});

// Call all the APIs
const Routes = require('./Routes/route.js');
app.use("/api", Routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listning at ${port}...`)
});

module.exports = app;