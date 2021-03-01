let dotenv = require('dotenv');
let jwt = require('jsonwebtoken');
let userService = require('./../repositories/userRepository');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;



function getTokenRouter(req, res){
    let username = req.body.username;
    let password = req.body.password; 
    
    console.log(accessTokenSecret, refreshTokenSecret);
}

module.exports = function getTokenRouter( router){

    router.post('/', async (req, res) => {
        res.type('json');

        let username = req.body.username;
        let password = req.body.password;

        // Check if username or password not defined
        if(!username || !password) {
            res.set('Content-Type','application/json');

            res.status(400).end( JSON.stringify({
                errors: [
                "Username or password cannot be empty"
            ]}));
        }

        // Get the user
        var user = await userService.getUserByUsernameAndPassword(username, password);
        
        if(!user)
        {
            res.status(404).end(JSON.stringify({ error: "User does not exists"  })
            );
            return;
        }        

        let accessTokenPayload = {user: {id: user.id, username: user.username }};
        let accessTokenOptions = {
            algorithm: "HS512",
            expiresIn: 60
        };

        let refreshTokenPayload = {"data":"refresh token"};
        let refreshTokenOptions = {
            algorithm: "HS512",
            expiresIn: 60
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