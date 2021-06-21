import * as dotenv from 'dotenv';
import userService from '../repositories/userRepository';
import {Request, Response, Router} from "express";
import * as jwt from "jsonwebtoken";
import { SignOptions} from "jsonwebtoken";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;



function getTokenRouter(req: Request, res: Response){
    let username = req.body.username;
    let password = req.body.password; 
    
    console.log(accessTokenSecret, refreshTokenSecret);
}

module.exports = function getTokenRouter( router: Router){

    router.post('/', async (req: Request, res: Response) => {
        res.type('json');

        let username = req.body.username;
        let password = req.body.password;

        // Check if username or password not defined
        if(!username || !password) {
            res.set('Content-Type','application/json');

            res.status(400).end( JSON.stringify({
                errors: [
                "Username or password cannot be empty."
            ]}));
            return;
        }

        // Get the user
        var user = await userService.getUserByUsernameAndPassword(username, password);
        
        if(!user)
        {
            res.status(404).end(JSON.stringify({ error: "Invalid Username or password."  })
            );
            return;
        }        

        let accessTokenPayload = {user: {id: user.id, username: user.username }};
        let accessTokenOptions: SignOptions = {
            algorithm: "HS512",
            expiresIn: 3600
        };

        let refreshTokenPayload = {"data":"refresh token"};
        let refreshTokenOptions: SignOptions = {
            algorithm: "HS512",
            expiresIn: 31536000 // 1 year
        };

        let accessToken = jwt.sign( accessTokenPayload, accessTokenSecret, accessTokenOptions);            
        let refreshToken = jwt.sign( refreshTokenPayload, refreshTokenSecret, refreshTokenOptions);
 
        res.status(200).send({
            "accessToken": accessToken,
            "refreshToken": refreshToken
        });        
    });

    return router;
}