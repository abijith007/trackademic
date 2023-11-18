const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authenticateJWT } = require('./middleware/authenticateJWT');
const { loginUser } = require('./controllers/loginController');
const { signupUser } = require('./controllers/signupController');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(cookieParser())


// Routes
app.post('/signup', signupUser);
app.post('/login', loginUser);
app.get('/protected', authenticateJWT, (req, res) => {
    res.json({ message: 'You accessed a protected route!', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
