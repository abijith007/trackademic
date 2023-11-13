const express = require('express');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const envPath = path.join(__dirname, '../', '.env');
const {authenticateJWT} = require('./middleware');
require('dotenv').config({ path: envPath });

const SECRET_KEY = process.env.SECRET_KEY;
const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000', // frontend server address
    credentials: true 
  }));
app.use(cookieParser())

app.post('/signup', async (req, res) => {
    console.log(req.body);

    // Check if username already exists    
    //Stub
    
    // const hashedPassword = await bcrypt.hash(password, 10);

    //Store credentials and signup details in database
    
    res.status(201).json({ message: 'User registered' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // ... user validation logic ...    
    
    let isValid = true;

    if (isValid) {
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '12h' });
        console.log(token)
        // Set the JWT in a cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            maxAge: 12 * 60 * 60 * 1000 // Cookie expiration set to match token
        });

        res.json({ message: 'Logged in successfully' });
    } else {
        return res.status(400).json({ error: 'Invalid username or password' });
    }
});

app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
