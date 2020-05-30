const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

function verifyUser(req, res, next) {
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
            if(error){
                res.status(401).json({ message: 'invalid token'});
            }else{
                req.username = decodedToken.username;
                next();
            }
        })
    }else{
        res.status(401).json({ message: 'Unauthorized'});
    }
}

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


module.exports = {
    verifyUser,
    isValid,
    generateToken
}