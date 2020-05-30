const express = require('express');
const cors = require('cors')

const Auth = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');
const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', Auth.verifyUser, userRouter);

module.exports = server;