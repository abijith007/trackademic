const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const { authenticateJWT } = require('./middleware');
require('dotenv').config({ path: envPath });
const { Users, Credentials } = require('./ORM/models/models');
const sequelize = require('./ORM/sequelize');

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const PORT = 4000;

sequelize.sync()
    .then(() => {
        console.log('All models were synchronized successfully.');
    })
    .catch(err => {
        console.error('Failed to synchronize models:', err);
    });

process.on('SIGINT', () => {
    sequelize.close().then(() => {
        console.log('Database connection closed.');
        process.exit();
    });
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // frontend server address
    credentials: true
}));
app.use(cookieParser())

app.post('/signup', async (req, res) => {
    const userDetails = {
        email: req.body.userDetails.email,
        firstName: req.body.userDetails.firstName,
        lastName: req.body.userDetails.lastName,
        password: req.body.userDetails.password,
    }
    bcrypt.hash(userDetails.password, saltRounds, (err, hash) => {
        if (!err) {
            userDetails.password = hash;
            Credentials.create({ email: userDetails.email, password: userDetails.password });
            Users.create({ email: userDetails.email, firstName: userDetails.firstName, lastName: userDetails.lastName });
            return res.status(201).json({ message: 'User registered' });
        }
        else
            return res.status(400).json({ message: "Registration failed" });
    });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Credentials.findOne({ where: { email: email } });
        if (!user)
            return res.status(400).json({ error: 'Invalid username or password' });
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return res.status(400).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '12h' });
        
        // Set the JWT in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000 // Cookie expiration set to match token
        });

        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
