'use strict';

const supertest = require('supertest');
const { app } = require('../src/server');
const request = supertest(app);

describe('API Server', () => {

  it('handles the person route', async () => {
    const response = await request.get('/person?name=bob');
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('bob');
  });

  it('handles invalid requests', async () => {
    const response = await request.get('/unknown-path');
    expect(response.status).toEqual(404);
  });

  it('handles error strings', async () => {
    const response = await request.get('/bad-route-error-string');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad-route-error-string');
    expect(response.body.message).toEqual('This is a bad route that throws an error string');
  });

  it('handles error objects', async () => {
    const response = await request.get('/bad-route-error-object');
    expect(response.status).toEqual(500);
    expect(response.body.route).toEqual('/bad-route-error-object');
    expect(response.body.message).toEqual('SERVER ERROR: This is a bad route that throws an error object');
  });

  it('handles the root path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBeTruthy();
    expect(response.text).toEqual('Hello World from a basic express server!');
  });
});
