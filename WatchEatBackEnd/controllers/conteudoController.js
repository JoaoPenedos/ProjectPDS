'use strict'

const conteudoData = require('../data/Conteudos');

const getConteudos = async (req, res, next) => {
    try {
        const conteudos = await conteudoData.getConteudos();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudo = async (req, res, next)=> {
    try {
        const conteudoId = req.params.Id;
        const oneConteudo = await conteudoData.getById(conteudoId);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudo = async (req, res, next)=> {
    try {
        const data = req.body;
        const created = await conteudoData.createConteudo(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConteudo = async (req, res, next)=> {
    try {
        const conteudoId = req.params.Id;
        const data = req.body;
        const updated = await conteudoData.updateConteudo(conteudoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteConteudo = async (req, res, next)=> {
    try {
        const conteudoId = req.params.Id;
        const deleted = await conteudoData.deleteConteudo(conteudoId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getConteudos,
    getConteudo,
    addConteudo,
    updateConteudo,
    deleteConteudo
}