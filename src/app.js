// Load modules
let dotenv = require('dotenv');
let express = require('express');

let userRouter = require('./routers/user-router');

let app = express();

// Load config from .env file
dotenv.config();

// set port and host
const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOSTNAME; 

// get all routers here
let myUserRouter = userRouter(express.Router());

app.use(express.json()) // for parsing application/json

// Setup all api router to /api/v1/
app.use('/api/v1', myUserRouter);

// listen on http(s)://host:port/
app.listen(PORT, HOST, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}/`);
});