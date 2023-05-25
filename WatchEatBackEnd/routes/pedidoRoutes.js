'use strict'
const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const { getPedidos, getPedido, getUserPedidos, addPedido } = pedidoController;

router.get('/Pedidos', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPedidos);
router.get('/Pedido/:Id', authCookie.authCookieVerify, getPedido);
router.get('/UserPedidos/:userId', authCookie.authCookieVerify, getUserPedidos);

router.post('/Pedido', authCookie.authCookieVerify, addPedido);

module.exports = {
    routes: router
}