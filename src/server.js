'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World from a basic express server!');
});

app.get('/person', validator, (req, res, next) => {
  res.status(200).send({
    name: req.query.name,
  });
});

app.get('/bad-route-error-string', (req, res, next) => {
  next('This is a bad route that throws an error string');
});

app.get('/bad-route-error-object', (req, res, next) => {
  throw new Error('This is a bad route that throws an error object');
});

app.use('*', notFound);

app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start };
