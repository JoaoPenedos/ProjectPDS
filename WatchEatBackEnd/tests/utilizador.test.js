const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('GET /Utilizadores', () => {
    it('should return utilizadores list when using valid token', async () => {
        // Create a mock token with the necessary user data
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        // Make the test request with the token in the headers
        const response = await request(app)
            .get('/api/Utilizadores')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /Utilizador', () => {
    it('should return one utilizador by Id with a valid token', async () => {
        // Create a mock token with the necessary user data
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        // Make the test request with the token in the headers
        const response = await request(app)
            .get('/api/Utilizador/1')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return empty when userId doens\'t exist', async () => {
        // Create a mock token with the necessary user data
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        // Make the test request with the token in the headers
        const response = await request(app)
            .get('/api/Utilizador/9999')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray([])).toBe(true);
    });
});