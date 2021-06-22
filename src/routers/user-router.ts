import userService from "../repositories/userRepository";
import express from 'express';
import {authenticate} from "../middlewares/authenticate";
import {authorize} from "../middlewares/authorize";

export function getUserRouter( router: express.Router){

    router.use([ authenticate, authorize ]);

    router.get('/', (req: express.Request, res: express.Response)=>{
        let users = userService.getUser(1);

        return res.json(users);
    });

    router.get('/:id', async (req: express.Request, res: express.Response)=>{
        let user = await userService.getUser(Number.parseInt(req.params.id));

        console.log(user)

        return res.json(user);
    });

    return router;
}





