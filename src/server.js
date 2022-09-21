'use strict';

const express = require('express');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');

const PORT = process.env.PORT || 3002;

const app = express();

app.use(logger);
app.use(validator);

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World');
});

app.get('/person', (req, res, next) => {
  let { person } = req.query;
  console.log('person', person);
});

app.use('*', notFound);

app.use(errorHandler);

function start() {
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}

module.exports = { app, start };
