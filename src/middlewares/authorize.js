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
        case undefined:
        case '':
            res.setHeader('Content-Type','application/json');
            res.status(400).end(JSON.stringify({
                errors: [
                    "No Authorization header found."
                ]
            }));
            break;
        case 'Bearer':

            break;

        default:

            break;
    }

    next();
}