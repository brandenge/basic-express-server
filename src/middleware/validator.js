'use strict';

const validator = (req, res, next) => {
  if (req.query.name) next();
  else next('A name is required when looking for a person. There was no name query parameter provided.');
};

module.exports = validator;
