let authenticate = require('./../middlewares/authenticate');
let authorize = require('./../middlewares/authorize');

module.exports = function getUserRouter( router){

    router.use([ authenticate, authorize ]);

    router.get('/users', (req, res)=>{
        let users = null;

        return res.json(users);

    });

    return router;
}