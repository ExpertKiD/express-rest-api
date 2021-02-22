// Load modules
var dotenv = require('dotenv');
var express = require('express');

var app = express();

// Load config from .env file
dotenv.config();

// set port and host
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOSTNAME; 

// listen on http(s)://host:port/
app.listen(PORT, HOST, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}/`);
});