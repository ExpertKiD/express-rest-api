import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {NextFunction, Response, Request} from "express";
import {VerifyOptions, Algorithm, JsonWebTokenError, TokenExpiredError, NotBeforeError, Secret} from "jsonwebtoken";

dotenv.config();

const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET!;

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

                console.log('Result: ' + result.toString())
                console.log(result)

                next();

            } catch (error){
                if(error instanceof JsonWebTokenError){
                    console.log('JSON Web Token Error: '+error.message.toString())
                } else if(error instanceof TokenExpiredError){
                    console.log('Token Expired Error: '+error.message.toString())
                } else if (error instanceof NotBeforeError){
                    console.log('Token Expired Error: '+error.message.toString())
                } else {
                    console.log('Error: '+error.message.toString())
                }

            } finally {

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

