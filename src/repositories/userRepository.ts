import * as env from 'dotenv';

env.config();

// Using in memory users for now!
let users = [
    {id: 1, username: "suman.adhikari", password: "123456"},
    {id: 2, username: "saurav.adhikari", password: "123"},
];

let userService = {
    getUser: async function(id: number){

        return users.find( user => user.id === id)
    },
    getAllUsers: function(){
        return users;
    },
    getUserByUsernameAndPassword: async function(user: string, pass: string){
        return users.find( ({ username, password}) => username === user && password === pass );;
    }
};

export default userService;