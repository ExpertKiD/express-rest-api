let dotenv = require('dotenv');

dotenv.config();

const accessToken = process.env.ACCESS_TOKEN_SECRET;
const refreshToken = process.env.REFRESH_TOKEN_SECRET;

function token(req, res){
    let username = req.body.username;
    let password = req.body.password; 
    
    console.log(accessToken, refreshToken);
}

module.exports = {

}