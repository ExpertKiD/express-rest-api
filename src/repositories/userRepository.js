let sql = require('mssql');
let env = require('dotenv');

env.config();

const config = {
    user: 'SA',
    password: 'Password$99',
    server: '01HO99\\SQLEXPRESS',
    database: 'expressdb'    
};

module.exports = {
    getUser: async function(id){
        await sql.connect(config);
        
        console.log(sql);

        return null;
    },
    getAllUsers: function(){
        return null;
    }
};



