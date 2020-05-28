const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const User = require('../users/user-model');

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === 'string')
}

function generateToken(user) {
    const payload = {
        username: user.username,
    }
    const options = {
        expiresIn: '1h',
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

router.post('/register', (req, res) => {
    const credentials = req.body;
    if(isValid(credentials)){
        const ROUNDS = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcrypt.hashSync(credentials.password, ROUNDS);
        credentials.password = hash;

        User.addUser(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: error.message });
            })
    }else{
        res.status(400).json({ message: 'Invalid username or password' });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(isValid(req.body)){
        User.findBy({username: username})
            .then(([user]) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = generateToken(user);
                    res.status(200).json({ message: `${user.username} is logged in`, token });
                }else{
                    res.status(401).json({ message: 'invalid username and/or password' });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: error.message });
            })
    }else{
        res.status(400).json({ message: 'Invalid username or password' });
    }
})

module.exports = router;
