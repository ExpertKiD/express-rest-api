import * as dotenv from 'dotenv';
import userService from '../repositories/userRepository';
import {Request, Response, Router} from "express";
import * as jwt from "jsonwebtoken";
import {Secret, SignOptions} from "jsonwebtoken";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET ===undefined || process.env.ACCESS_TOKEN_SECRET === ''? 'access-secret': process.env.ACCESS_TOKEN_SECRET.toString();
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET === undefined || process.env.REFRESH_TOKEN_SECRET === ''? 'refresh-secret':process.env.REFRESH_TOKEN_SECRET.toString();

const accessTokenExpireTime: number = (process.env.ACCESS_TOKEN_EXPIRY_TIME_IN_SECONDS === undefined || process.env.ACCESS_TOKEN_EXPIRY_TIME_IN_SECONDS === '' || isNaN(Number.parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME_IN_SECONDS)))? 3600 : Number.parseInt(process.env.ACCESS_TOKEN_EXPIRY_TIME_IN_SECONDS);
const refreshTokenExpireTime: number = (process.env.REFRESH_TOKEN_EXPIRY_TIME_IN_SECONDS === undefined || process.env.REFRESH_TOKEN_EXPIRY_TIME_IN_SECONDS === ''|| isNaN(Number.parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME_IN_SECONDS)))? 7200 : Number.parseInt(process.env.REFRESH_TOKEN_EXPIRY_TIME_IN_SECONDS);

export function getTokenRouter( router: Router){

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
        let user = await userService.getUserByUsernameAndPassword(username, password);

        if(!user)
        {
            res.status(404).end(JSON.stringify({ error: "Invalid Username or password."  })
            );
            return;
        }

        let accessTokenPayload = {user: {id: user.id, username: user.username }};
        let accessTokenOptions: SignOptions = {
            algorithm: "HS512",
            expiresIn: accessTokenExpireTime
        };

        let refreshTokenPayload = {"data":"refresh token"};
        let refreshTokenOptions: SignOptions = {
            algorithm: "HS512",
            expiresIn: refreshTokenExpireTime
        };

        let accessToken = jwt.sign( accessTokenPayload, accessTokenSecret, accessTokenOptions);
        let refreshToken = jwt.sign( refreshTokenPayload, refreshTokenSecret, refreshTokenOptions);

        res.setHeader('Content-Type','application/json');
        res.status(200).end(JSON.stringify({
            "accessToken": accessToken,
            "refreshToken": refreshToken
        }));
        return;
    });

    return router;
}
