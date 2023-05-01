'use strict'

const bibliotecaData = require('../data/Bibliotecas')

const getBibliotecas = async (req, res) => {
    try {
        const bibliotecas = await bibliotecaData.listBibliotecas();
        res.send(bibliotecas);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const oneBiblioteca = await bibliotecaData.listBibliotecaByUserId(userId);
        res.send(oneBiblioteca);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoInBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await bibliotecaData.createConteudoInBiblioteca(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConteudoInBiblioteca = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const created = await bibliotecaData.updateConteudoInBiblioteca(userId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getBibliotecas,
    getBiblioteca,
    addConteudoInBiblioteca,
    updateConteudoInBiblioteca
}