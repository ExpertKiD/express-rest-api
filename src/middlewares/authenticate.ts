module.exports = function authenticate(req, res, next){
    console.log('TODO [1]: This module authenticates the user')
    
    let user = req.body.username;
    let pass = req.body.password;

    // User not aunthenticated, return error

    
    
    

    next();
}