const express = require('express');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');
const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);

module.exports = server;