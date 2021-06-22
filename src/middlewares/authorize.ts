import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {NextFunction, Response, Request} from "express";
import {VerifyOptions, Algorithm, JsonWebTokenError, TokenExpiredError, NotBeforeError, Secret} from "jsonwebtoken";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET === undefined? 'access-secret': process.env.ACCESS_TOKEN_SECRET.toString();
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET === undefined? 'refresh-secret':process.env.REFRESH_TOKEN_SECRET.toString();

export async function authorize(req: Request, res: Response, next: NextFunction){
    console.log('TODO [2]: This module authorizes the user');

    let authHeader = req.headers.authorization;

    if(authHeader === undefined){
        res.setHeader('Content-Type','application/json');
        res.status(400).end(JSON.stringify({
            errors:[
                "No Authorization header found."
            ]
        }));
        return;
    }

    let [authMethod, authToken] = authHeader.split(' ');

    switch(authMethod){

        case 'Bearer':
            // Check for empty token
            if( authToken === undefined)
            {
                res.setHeader('Content-Type','application/json');
                res.status(400).end(JSON.stringify({
                    errors: [
                        "No Bearer token found."
                    ]
                }));
            }

            let accessTokenOptions: VerifyOptions = {
                algorithms: ["HS512"]
            };

            console.log([accessTokenSecret, refreshTokenSecret])

            try {
                // Verify the token
                let result = jwt.verify(authToken, accessTokenSecret, accessTokenOptions)

                next();

            } catch (error){

                if(error instanceof NotBeforeError){
                    res.setHeader('Content-Type','application/json');

                    res.status(400).end(JSON.stringify({
                        errors: [
                            "Token cannot be used before start period."
                        ]
                    }));

                    return;
                } else if(error instanceof TokenExpiredError){
                    res.setHeader('Content-Type','application/json');

                    res.status(400).end(JSON.stringify({
                        errors: [
                            "Token expired."
                        ]
                    }));

                    return;
                } else if (error instanceof JsonWebTokenError){
                    res.setHeader('Content-Type','application/json');

                    res.status(400).end(JSON.stringify({
                        errors: [
                            "Token cannot be verified."
                        ]
                    }));

                    return;
                } else {
                    res.setHeader('Content-Type','application/json');

                    res.status(400).end(JSON.stringify({
                        errors: [
                            "Unknown error!"
                        ]
                    }));

                    return;
                }

            }

            break;

        case undefined:
        case '':
        default:
            res.setHeader('Content-Type','application/json');
            res.status(400).end(JSON.stringify({
                errors: [
                    "No Authorization header found."
                ]
            }));
            return;
            break;
    }


}

