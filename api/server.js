const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-964935.okta.com/oauth2/default' // required
  });

const environment = process.env.NODE_ENV

// ROUTER IMPORTS
const authRouter = require('../routers/auth/authRouter');
const deptRouter = require('../routers/departments/deptRouter');
const inventoryRouter = require('../routers/inventory/inventoryRouter');
const userRouter = require('../routers/users/userRouter');

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
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter)
server.use('/api/departments', deptRouter);
server.use('/api/inventory', inventoryRouter);



server.get("/", (req, res) => {
    res.json(`STATUS: Wedding Warehouse api is running in ${environment} mode`);
  });

module.exports = server;