const request = require('supertest');
const app = require('../index'); // Replace with the actual path to your app

describe('utilizadorController', () => {
    // Mock the utilizadorData methods as needed
    jest.mock('../data/utilizadorService', () => ({
        listUtilizadores: jest.fn().mockResolvedValue(['user1', 'user2']),
        listUtilizadorById: jest.fn().mockResolvedValue('user'),
        listUtilizadorAmizades: jest.fn().mockResolvedValue(['friend1', 'friend2']),
        listUtilizadorAmizadesTop6: jest.fn().mockResolvedValue(['friend1', 'friend2']),
        createUtilizador: jest.fn().mockResolvedValue('created'),
        listAmizade: jest.fn().mockResolvedValue([]),
        createPedidoAmizade: jest.fn().mockResolvedValue('created'),
        updateUtilizador: jest.fn().mockResolvedValue('updated'),
        updatePedidoAmizade: jest.fn().mockResolvedValue('updated'),
        deleteUtilizador: jest.fn().mockResolvedValue('deleted'),
    }));

    it('should get all utilizadores', async () => {
        const res = await request(app).get('/Utilizadores').expect(200);
        expect(res.body).toEqual(['user1', 'user2']);
    });

    it('should get a specific utilizador', async () => {
        const res = await request(app).get('/Utilizador/123').expect(200);
        expect(res.body).toEqual('user');
    });

    it('should get utilizador amizades', async () => {
        const res = await request(app).get('/UtilizadorAmizade/123').expect(200);
        expect(res.body).toEqual(['friend1', 'friend2']);
    });

    it('should get top 6 utilizador amizades', async () => {
        const res = await request(app).get('/UtilizadorAmizadeTop6/123').expect(200);
        expect(res.body).toEqual(['friend1', 'friend2']);
    });

    it('should add a new utilizador', async () => {
        const data = { name: 'John Doe' };
        const res = await request(app).post('/Utilizador').send(data).expect(200);
        expect(res.body).toEqual('created');
    });

    it('should add a new utilizador amizade', async () => {
        const data = { UtilizadorId2: '456' };
        const res = await request(app).post('/UtilizadorAmizade/123').send(data).expect(200);
        expect(res.body).toEqual('created');
    });

    it('should update a utilizador', async () => {
        const data = { name: 'Jane Smith' };
        const res = await request(app).put('/Utilizador/123').send(data).expect(200);
        expect(res.body).toEqual('updated');
    });

    it('should update a pedido amizade', async () => {
        const data = { Estado: 'Amigos' };
        const res = await request(app).put('/Utilizador/PedidoAmizade/123').send(data).expect(200);
        expect(res.body).toEqual('updated');
    });

    it('should delete a utilizador', async () => {
        const res = await request(app).delete('/Utilizador/123').expect(200);
        expect(res.body).toEqual('deleted');
    });
});