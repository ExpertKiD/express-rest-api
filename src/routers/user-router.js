let authenticate = require('./../middlewares/authenticate');
let authorize = require('./../middlewares/authorize');
let userRepository = require('./../repositories/userRepository');


module.exports = function getUserRouter( router){

    router.use([ authenticate, authorize ]);

    router.get('/', (req, res)=>{
        let users = userRepository.getUser(1);

        return res.json(users);

    });

    return router;
}