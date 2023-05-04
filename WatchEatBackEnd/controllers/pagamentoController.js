'use strict'
const pagamentoData = require('../data/pagamentoService');

const getPagamentos = async (req, res) => {
    try {
        const pagamentos = await pagamentoData.listPagamentos();
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserPagamentos = async (req, res) => {
    try {
        const userId = req.body;
        const pagamentos = await pagamentoData.listUserPagamentos(userId.UtilizadorId);
        res.send(pagamentos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPagamento = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const onePagamento = await pagamentoData.listPagamentoById(pagamentoId);
        res.send(onePagamento);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPagamentosPremium = async (req, res)=> {
    try {
        const pagamentosPremium = await pagamentoData.listPagamentosPremium();
        res.send(pagamentosPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getTopPagamentoPremium = async (req, res)=> {
    try {
        const userId = req.body;
        const topPagamentoPremium = await pagamentoData.listTopPagamentoPremium(userId.UtilizadorId);
        res.send(topPagamentoPremium);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPagamentoPedido = async (req, res)=> {
    try {
        const data = req.body;
        const created = await pagamentoData.createPagamentoPedido(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPagamentoPremium = async (req, res)=> {
    try {
        const data = req.body.UtilizadorId;
        const created = await pagamentoData.createPagamentoPremium(data);
        res.send(created);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePagamento = async (req, res)=> {
    try {
        const pagamentoId = req.params.Id;
        const data = req.body;
        const updated = await pagamentoData.updatePagamento(pagamentoId, data);
        res.send(updated);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getPagamentos,
    getUserPagamentos,
    getPagamento,
    getPagamentosPremium,
    getTopPagamentoPremium,
    addPagamentoPedido,
    addPagamentoPremium,
    updatePagamento
}