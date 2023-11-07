const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const path = require('path');
const envPath = path.join(__dirname, '../../', '.env');
require('dotenv').config({ path: envPath });

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY);
const app = express();
const PORT = 4000;


app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists    
    //Stub
    
    const hashedPassword = await bcrypt.hash(password, 10);

    //Store credentials and signup details in database
    
    res.status(201).json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists       

    if (!user) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '12h' });
    res.json({ token, message: 'Logged in successfully' });
});

// Middleware to check JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Token is not valid' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Authorization token is required' });
    }
}

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
