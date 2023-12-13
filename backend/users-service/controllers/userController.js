const path = require('path');
const loginUser = require('../services/userLogin');
const getUsersService = require('../services/getUsersService');
const updateUserService = require('../services/updateUser');
const getUserByIDService = require('../services/getUserByIDService');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });


async function getUsers(req,res){    
    res.send(await getUsersService(req,res))
}

async function updateUser(req,res){
    res.send(await updateUserService(req,res));
}

async function getUserByID(req,res){
    console.log(req.query);
    res.send(await getUserByIDService(req,res));
}

module.exports = {
    getUsers,
    updateUser,
    getUserByID
};
