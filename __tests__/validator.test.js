'use strict';

let validator = require('../src/middleware/validator');

describe('Test the Validator middleware', () => {
  const next = jest.fn();

  it('sends the request through when the query string is valid', () => {
    const req = {
      query: {
        name: 'Bob',
      },
    };
    validator(req, {}, next);
    expect(next).toHaveBeenCalledWith();
  });

  it('throws an error when the query string is invalid', () => {
    const req = {
      query: {},
    };
    validator(req, {}, next);
    expect(next).toHaveBeenCalledWith('A name is required when looking for a person. There was no name query parameter provided.');
  });
});
