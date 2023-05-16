const request = require('supertest');
const app = require('../index');

beforeAll(done => {
    done()
})

describe('POST /api/authLogin', () => {
    it('should redirect to \'/pagina-inicial\' if valid login', async () => {
        const res = await request(app)
            .post('/api/authLogin')
            .send({
                Email: 'teste@gmail.com',
                Password: 'teste1234'
            })
            .expect(302);

        expect(res.headers.location).toEqual('/pagina-inicial');
    });

    it('should return 403 if invalid login', async () => {
        const res = await request(app)
            .post('/api/authLogin')
            .send({
                Email: 'testuser@test.com',
                Password: 'invalidpassword'
            })
            .expect(403);

        expect(res.body.error).toBe('invalid login');
    });


    it('should return 403 if user is blocked or suspended', async () => {
        const res = await request(app)
            .post('/api/authLogin')
            .send({
                Email: 'user1@gmail.com',
                Password: '1234'
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
                Email: 'teste@gmail.com',
                Password: 'vsdsdv',
                confirm_password: 'svdsdv'
            })
            .expect(409);
        expect(res.body.error).toBe("Email already in use");
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

        expect(res.body.error).toBe("Password doesn\'t match confirm_password field");
    });
});

afterAll(done => {
    app.close()
    done()
})