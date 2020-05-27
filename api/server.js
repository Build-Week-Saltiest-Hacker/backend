const express = require('express');

// const authenticate = require('../auth/authenticate-middleware');
authRouter = require('../routers/auth-router');

const server = express();

server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/')

module.exports = server;