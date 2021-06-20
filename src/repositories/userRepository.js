let sql = require('mssql');
let env = require('dotenv');

env.config();

const config = {
    user: 'SA',
    password: 'Password$99',
    server: '01HO99\\SQLEXPRESS',
    database: 'expressdb'    
};

// Using in memory users for now!
let users = [
    {id: 1, username: "suman.adhikari", password: "123456"},
    {id: 2, username: "saurav.adhikari", password: "123"},
];

module.exports = {
    getUser: async function(id){

        return users.find( user => user.id === id)
    },
    getAllUsers: function(){
        return users;
    },
    getUserByUsernameAndPassword: async function(user, pass){
        return users.find( ({ username, password}) => username === user && password === pass );;
    }
};



