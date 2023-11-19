const path = require('path');
const loginUser = require('../services/userLogin');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });


async function userLogin(req,res){
    await loginUser(req,res);
}

async function adminLogin(req,res){
    //Todo
}

module.exports = {
    userLogin , adminLogin
};
