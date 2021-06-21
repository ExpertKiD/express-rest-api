// Load modules
import * as dotenv from 'dotenv';

import {getUserRouter} from "./routers/user-router";
import { getTokenRouter} from "./routers/token-router";
import {Router } from "express";
import * as express from 'express';

let app = express();



// Load config from .env file
dotenv.config();

// set port and host
const PORT: number = process.env.APP_PORT === null?Number.parseInt(process.env.APP_PORT): 3000;
const HOST: string = process.env.APP_HOSTNAME === null? process.env.APP_HOSTNAME: '';

// get all routers here
let myUserRouter: Router = getUserRouter(express.Router());
let myTokenRouter: Router = getTokenRouter(express.Router());

app.use(express.json()) // for parsing application/json

// Setup all api router to /api/v1/
app.use('/api/v1/users', myUserRouter);
app.use('/api/v1/token', myTokenRouter);

// listen on http(s)://host:port/
app.listen(PORT, HOST, ()=>{
    console.log(`Server running at http://${HOST}:${PORT}/`);
});