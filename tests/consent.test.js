const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const Candidate = require('../src/models/Candidate');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

describe('Consent endpoint', () => {
    it('POST /api/v1/candidates/:id/connect-consent creates candidate and stores consent timestamp', async () => {
        const uid = 'candidate-123';
        const payload = { name: 'Alice', email: 'alice@example.com' };

        const res = await request(app)
            .post(`/api/v1/candidates/${uid}/connect-consent`)
            .send(payload)
            .expect(201);

        expect(res.body).toHaveProperty('message', 'Consent recorded');
        expect(res.body.candidate).toMatchObject({ uid, name: 'Alice', email: 'alice@example.com' });

        const candidate = await Candidate.findOne({ uid }).lean();
        expect(candidate).toBeTruthy();
        expect(candidate).toHaveProperty('lastConsentAt');
        expect(candidate.consents).toBeDefined();
        expect(candidate.consents.length).toBe(1);
    });

    it('Calling consent endpoint twice appends consents and updates lastConsentAt', async () => {
        const uid = 'candidate-456';
        await request(app).post(`/api/v1/candidates/${uid}/connect-consent`).send({ name: 'Bob' }).expect(201);
        await request(app).post(`/api/v1/candidates/${uid}/connect-consent`).send({ name: 'Bob' }).expect(201);

        const candidate = await Candidate.findOne({ uid }).lean();
        expect(candidate.consents.length).toBe(2);
    });
});