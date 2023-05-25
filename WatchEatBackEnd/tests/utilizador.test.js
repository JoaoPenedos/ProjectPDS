const request = require('supertest');
const app = require('../index');
const utilizadorData = require('../data/utilizadorService');

const testPort = 3001; // Choose a different port for testing
let server; // Define a variable to hold the server instance

beforeAll(done => {
    server = app.listen(testPort, () => {
        console.log('Test server is listening on http://localhost:' + testPort);
        done();
    });
});

describe('GET /Utilizadores', () => {
    it('should return utilizadores', async () => {
        const response = await request(app).get('/api/Utilizadores');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // it('should handle errors when retrieving utilizadores', async () => {
    //     // Mock the listUtilizadores function to throw an error
    //     jest.mock('/api/Utilizadores', () => ({
    //         listUtilizadores: jest.fn().mockRejectedValue(new Error('Database connection failed')),
    //     }));
    //
    //     const res = await request(app).get('/Utilizadores').expect(400);
    //
    //     expect(res.text).toBe('Database connection failed');
    // });

});

afterAll(done => {
    server.close(() => {
        console.log('Test server closed');
        done();
    });
});