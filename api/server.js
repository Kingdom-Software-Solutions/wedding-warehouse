const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const environment = process.env.NODE_ENV

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
    res.json(`STATUS: Wedding Warehouse api is running in ${environment} mode`);
  });

module.exports = server;