'use strict'
const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const authCookie = require("../middleware/authCookieVerify");
const router = express.Router();

const { getPedidos, getPedido, addPedido } = pedidoController;

router.get('/Pedidos', authCookie.authCookieVerify, getPedidos);
router.get('/Pedido/:Id', authCookie.authCookieVerify, getPedido);

router.post('/Pedido', authCookie.authCookieVerify, addPedido);

module.exports = {
    routes: router
}