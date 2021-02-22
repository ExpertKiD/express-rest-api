// Load modules
var dotenv = require('dotenv');
var express = require('express');

var app = express();

// Load config from .env file
dotenv.config();

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOSTNAME; 

app.listen(PORT, HOST, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}/`);
});