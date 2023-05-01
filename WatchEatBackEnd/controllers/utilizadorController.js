'use strict'

const utilizadorData = require('../data/Utilizadores');

const getUtilizadores = async (req, res) => {
    try {
        const utilizadores = await utilizadorData.listUtilizadores();
        res.send(utilizadores);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const oneUtilizador = await utilizadorData.listUtilizadorById(utilizadorId);
        res.send(oneUtilizador);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUtlizador = async (req, res)=> {
    try {
        const data = req.body;
        const created = await utilizadorData.createUtilizador(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addUtlizadorAmizade = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const created = await utilizadorData.createPedidoAmizade(utilizadorId, data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        const updated = await utilizadorData.updateUtilizador(utilizadorId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePedidoAmizade = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const data = req.body;
        if (data.Estado === "Amigos"){
            const updated = await utilizadorData.updatePedidoAmizade(utilizadorId, data);
            res.send(updated);
        }
        else if (data.Estado === "Nao Aceitar"){
            const deleted = await utilizadorData.deletePedidoAmizade(utilizadorId, data);
            res.send(deleted);
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUtilizador = async (req, res)=> {
    try {
        const utilizadorId = req.params.Id;
        const deleted = await utilizadorData.deleteUtilizador(utilizadorId);
        res.send(deleted);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUtilizadores,
    getUtilizador,
    addUtlizador,
    addUtlizadorAmizade,
    updateUtilizador,
    updatePedidoAmizade,
    deleteUtilizador
}