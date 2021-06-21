let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

module.exports = async function authorize(req, res, next){
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

            let accessTokenOptions = {
                algorithm: "HS512",
                expiresIn: 60
            };

            console.log([accessTokenSecret, refreshTokenSecret])

            try {
                // Verify the token
                let result = jwt.verify(authToken, accessTokenSecret, accessTokenOptions)

                console.log('Result: ' + result.toString())
                console.log(result)
            } catch (err){

                console.log(err);



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

    next();
}