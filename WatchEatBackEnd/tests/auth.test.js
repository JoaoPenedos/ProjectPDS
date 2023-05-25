const request = require('supertest');
const app = require('../index');

const testPort = 3002; // Choose a different port for testing
let server; // Define a variable to hold the server instance

beforeAll(done => {
    server = app.listen(testPort, () => {
        console.log('Test server is listening on http://localhost:' + testPort);
        done();
    });
});

describe('POST /api/authLogin', () => {
    // it('should redirect to \'/pagina-inicial\' if valid login', async () => {
    //     const res = await request(app)
    //         .post('/api/authLogin')
    //         .send({
    //             Email: 'user1@gmail.com',
    //             Password: '1234'
    //         })
    //         .expect(200);
    //
    //     expect(res.headers.location).toEqual('/pagina-inicial');
    // });

    it('should return 403 if invalid login', async () => {
        const res = await request(app)
            .post('/api/authLogin')
            .send({
                Email: 'testuser@test.com',
                Password: 'invalidpassword'
            })
            .expect(403);

        expect(res.body.error).toBe('Login invalido!');
    });


    it('should return 403 if user is blocked or suspended', async () => {
        const res = await request(app)
            .post('/api/authLogin')
            .send({
                Email: 'user4@gmail.com',
                Password: '13121'
            })
            .expect(403);

        expect(res.body.error).toBe('A conta deste utilizador está neste momento suspensa ou bloqueada, por favor tente mais tarde!');
    });
});

describe('POST /api/authRegister', () => {
    it('should return 409 if email is already in use', async () => {
        const res = await request(app)
            .post('/api/authRegister')
            .send({
                Email: 'user1@gmail.com',
                Password: 'vsdsdv',
                confirm_password: 'svdsdv'
            })
            .expect(409);
        expect(res.body.error).toBe("Email já em uso!");
    });

    it('should return 409 if password doesn\'t match confirm_password', async () => {
        const res = await request(app)
            .post('/api/authRegister')
            .send({
                Email: 'newTestUser@test.com',
                Password: 'newTestUserPassword',
                confirm_password: 'sgvdcjhsb'
            })
            .expect(409);

        expect(res.body.error).toBe("Password não é igual ao campo Confirm Password!");
    });
});

afterAll(done => {
    server.close(() => {
        console.log('Test server closed');
        done();
    });
});