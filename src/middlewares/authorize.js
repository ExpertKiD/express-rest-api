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
            break;
    }

    next();
}