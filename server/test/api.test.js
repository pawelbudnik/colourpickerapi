const request = require('supertest');

const app = require('../src/app');

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'API - 👋🌎🌍🌏'
      }, done);
  });
});

describe('GET /api/v1/colourpicker', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/colourpicker')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, [{"_id":"616fd9f279a0534e6c561e35","colour":"black","hex":"#fffffff","rgb":"rgb(0, 0, 0)"}], done);
  });
});
