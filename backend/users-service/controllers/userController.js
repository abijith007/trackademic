const path = require('path');
const loginUser = require('../services/userLogin');
const getUsersService = require('../services/getUsersService');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });


async function getUsers(req,res){    
    res.send(await getUsersService(req,res))
}


module.exports = {
    getUsers
};
