const express = require('express');
const projectRouter = require('./projects/project-router.js');

const server = express();

server.use(express.json());
server.use('/projects', projectRouter);

server.get('/', (req, res) => {
  res.send('api up and running boy');
});

module.exports = server;
