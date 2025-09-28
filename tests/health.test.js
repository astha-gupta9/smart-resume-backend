const request = require('supertest');
const app = require('../src/app');

describe('Health route', () => {
    it('GET /health should return ok', async () => {
        const res = await request(app).get('/health').expect(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('env');
        expect(res.body).toHaveProperty('time');
    });
});