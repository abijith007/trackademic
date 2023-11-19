const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Credentials } = require("../ORM/models/models");
const SECRET_KEY = process.env.SECRET_KEY;

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        let user = await Credentials.findOne({ where: { email: email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const isValid = await bcrypt.compare(password, user.password);
        
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '12h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 1000
        });

        res.json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = loginUser;