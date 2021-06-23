import userService from "../repositories/userRepository";
import {Request, Response, Router } from 'express';
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";

export function getUserRouter( router: Router){

    router.use([ authenticate, authorize ]);

    router.get('/', (req: Request, res: Response)=>{
        let users = userService.getUser(1);

        return res.json(users);
    });

    router.get('/:id', async (req: Request, res: Response)=>{
        let user = await userService.getUser(Number.parseInt(req.params.id));

        console.log(user)

        return res.json(user);
    });

    return router;
}





