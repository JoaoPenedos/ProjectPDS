const request = require('supertest');
const app = require('../index');

// Mock the JWT verification function
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue({ user: 'testUser' }),
}));

describe('authCookieVerify middleware', () => {
    it('should validate the token from the Authorization header', async () => {
        // Set up a mocked request with an Authorization header
        const mockToken = 'mockedToken';
        const mockRequest = request(app)
            .get('/api/Menus')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200);

        // Perform the request and check the response
        await mockRequest.expect(200);
        expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.SECRET_TOKEN);
        expect(mockRequest.body).toEqual({ user: 'testUser' });
    });

    it('should validate the token from the cookie if Authorization header is missing', async () => {
        // Set up a mocked request with a cookie
        const mockToken = 'mockedToken';
        const mockRequest = request(app)
            .get('/api/Menus')
            .set('Cookie', `token=${mockToken}`)
            .expect(200);

        // Perform the request and check the response
        await mockRequest.expect(200);
        expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.SECRET_TOKEN);
        expect(mockRequest.body).toEqual({ user: 'testUser' });
    });

    it('should return 401 if no token is provided', async () => {
        // Set up a mocked request without an Authorization header or cookie
        const mockRequest = request(app)
            .get('/api/Menus')
            .expect(401);

        // Perform the request and check the response
        await mockRequest.expect(401);
        expect(mockRequest.body).toEqual({ message: 'Token not provided' });
    });

    it('should return 401 if JWT verification fails', async () => {
        // Mock the JWT verification to throw an error
        jwt.verify.mockImplementationOnce(() => {
            throw new Error('Invalid token');
        });

        // Set up a mocked request with an Authorization header
        const mockToken = 'invalidToken';
        const mockRequest = request(app)
            .get('/api/Menus')
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(401);

        // Perform the request and check the response
        await mockRequest.expect(401);
        expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.SECRET_TOKEN);
        expect(mockRequest.body).toEqual({ error: 'Invalid token' });
    });
});