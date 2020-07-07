const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const environment = process.env.NODE_ENV

// ROUTER IMPORTS
const authRouter = require('../routers/auth/authRouter');

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

// USE ROUTERS
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
    res.json(`STATUS: Wedding Warehouse api is running in ${environment} mode`);
  });

module.exports = server;