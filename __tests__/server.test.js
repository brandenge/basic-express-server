'use strict';

const supertest = require('supertest');
const { app } = require('../server');
const request = supertest(app);

describe('API Server', () => {
  it('handles the invalid requests', async () => {
    const response = await request.get('/foo');
    expect(response.status).toEqual(404);
  });
  it('handles the errors', async () => {
    const response = await request.get('/bad');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad');
    expect(response.body.message).toEqual('This is a bad route that resulted in an error');
  });
  it('handles the root path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World from my Express server');
  });
});
