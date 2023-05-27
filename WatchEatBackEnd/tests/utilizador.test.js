const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');

describe('GET /Utilizadores', () => {
    it('should return utilizadores with valid token', async () => {
        // Create a mock token with the necessary user data
        const token = jwt.sign({ user: 'mockUser' }, process.env.SECRET_TOKEN);

        // Make the test request with the token in the headers
        const response = await request(app)
            .get('/api/Utilizadores')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return 401 error without token', async () => {
        // Make the test request without providing a token in the headers
        const response = await request(app).get('/api/Utilizadores');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Token not provided' });
    });

    it('should return 401 error with invalid token', async () => {
        const token = 'invalid-token';

        const response = await request(app)
            .get('/api/Utilizadores')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(401);
    });
});