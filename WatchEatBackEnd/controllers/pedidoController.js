'use strict'
const pedidosData = require('../data/pedidoService');
const pagamentosData = require('../data/pagamentoService');
const produtosData = require('../data/produtoService');
const pedidosProdutosData = require('../data/pedidoProdutoService');
const sql = require("mssql");

const getPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosData.listPedidos();
        res.send(pedidos);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const getPedido = async (req, res)=> {
    try {
        const pedidoId = req.params.Id;
        const onePedido = await pedidosData.listPedidoById(pedidoId);
        res.send(onePedido);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const addPedido = async (req, res)=> {
    try {
        let precoTotal = 0;
        const data = req.body;
        const created = await pedidosData.createPedido(data);
        for (const item of data.produtos) {
            const getProdutoByNome = await produtosData.listProdutoByNome(item.Nome);

            if (getProdutoByNome[0].Stock >= item.Quantidade) {
                await pedidosProdutosData.createPedidoProduto(created[0].Id,
                    getProdutoByNome[0].Id, getProdutoByNome[0].Preco, item.Quantidade);
                precoTotal += (getProdutoByNome[0].Preco * item.Quantidade);
            }
        }

        await pedidosData.updatePrecoTotalPedido(created[0].Id,precoTotal)
        const createdPagamento = await pagamentosData.createPagamentoPedido(created[0].Id, precoTotal, data.UtilizadorId);
        res.send({created, createdPagamento});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


// const updatePagamento = async (req, res)=> {
//     try {
//         const pagamentoId = req.params.Id;
//         const data = req.body;
//         const updated = await pagamentoData.updatePagamento(pagamentoId, data);
//         res.send(updated);
//     }
//     catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    getPedidos,
    getPedido,
    addPedido,
    // updatePagamento
}