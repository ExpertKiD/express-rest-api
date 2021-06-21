import { Request, Response, NextFunction} from 'express';



export default function authenticate(req: Request, res: Response, next: NextFunction ){
    console.log('TODO [1]: This module authenticates the user')
    
    let user = req.body.username;
    let pass = req.body.password;

    // User not aunthenticated, return error

    

    next();
}