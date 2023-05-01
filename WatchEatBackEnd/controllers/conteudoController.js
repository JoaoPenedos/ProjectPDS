'use strict'

const conteudoData = require('../data/Conteudos');

const getConteudos = async (req, res) => {
    try {
        const conteudos = await conteudoData.listConteudos();
        res.send(conteudos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudo = async (req, res)=> {
    try {
        const conteudoId = req.params.Id;
        const oneConteudo = await conteudoData.listConteudoById(conteudoId);
        res.send(oneConteudo);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudosFilmes = async (req, res) => {
    try {
        const conteudosFilmes = await conteudoData.listConteudosFilmes();
        res.send(conteudosFilmes);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getConteudosSeries = async (req, res) => {
    try {
        const conteudosSeries = await conteudoData.listConteudosSeries();
        res.send(conteudosSeries);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudo = async (req, res)=> {
    try {
        const data = req.body;
        const created = await conteudoData.createConteudo(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoFilme = async (req, res)=> {
    try {
        const data = req.body;
        const created = await conteudoData.createConteudoFilme(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addConteudoSerie = async (req, res)=> {
    try {
        const data = req.body;
        const created = await conteudoData.createConteudoSerie(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateConteudo = async (req, res)=> {
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

const deleteConteudo = async (req, res)=> {
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
    getConteudosFilmes,
    getConteudosSeries,
    addConteudo,
    addConteudoFilme,
    addConteudoSerie,
    updateConteudo,
    deleteConteudo
}