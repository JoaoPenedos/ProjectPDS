'use strict'
const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

const {getProdutos, getProduto, addProduto, updateProduto, deleteProduto} = produtoController;

router.get('/Produtos', getProdutos);
router.get('/Produto/:Id', getProduto);
router.post('/Produto', addProduto);
router.put('/Produto/:Id', updateProduto);
router.delete('/Produto/:Id', deleteProduto);

module.exports = {
    routes: router
}