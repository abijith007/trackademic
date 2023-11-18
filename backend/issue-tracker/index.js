const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const { authenticateJWT } = require('./middleware/authenticateJWT');
require('dotenv').config({ path: envPath });
const { Users } = require('./ORM/models/models');
const sequelize = require('./ORM/sequelize');

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const PORT = 4001;

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser())



// Routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
