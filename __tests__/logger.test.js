'use strict';

let logger = require('../src/middleware/logger');

describe('Test the Logger middleware', () => {
  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('Properly logs the output', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalledWith(`REQUEST METHOD: ${req.method}, REQUEST ORIGINAL URL: ${req.originalUrl}`);
  });
  it('Properly calls next()', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
