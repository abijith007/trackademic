const jwt = require('jsonwebtoken');
const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateJWT(req, res, next) {  
  const token = req.cookies.token;    
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {       
    res.status(400).send('Invalid Token');
  }
}

module.exports = { authenticateJWT };