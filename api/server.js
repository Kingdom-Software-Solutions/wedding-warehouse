const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan')

const environment = process.env.NODE_ENV

// ROUTER IMPORTS
const authRouter = require('../routers/auth/authRouter');
const deptRouter = require('../routers/departments/deptRouter')

const server = express();
server.use(helmet());
server.use(express.json());
server.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, "content-length"),
            "-",
            tokens["response-time"](req, res),
            "ms",
        ].join(" ");
    })
)
server.use(cors());

// USE ROUTERS
server.use('/api/auth', authRouter)
server.use('/api/departments', deptRouter)

server.get("/", (req, res) => {
    res.json(`STATUS: Wedding Warehouse api is running in ${environment} mode`);
  });

module.exports = server;