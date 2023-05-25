'use strict'
const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const premiumTier = require("../middleware/premiumTier");
const pagamentoPedidos = require("../middleware/pagamentoPedido")
const router = express.Router();

const {getPagamentos, getUserPagamentos, getPagamento, getPagamentosPremium, getPagamentoPremiumNaoPago, getTopPagamentoPremium,
    addPagamentoPedido, addPagamentoPremium, updatePagamento } = pagamentoController;

router.get('/Pagamentos', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPagamentos);
router.get('/UserPagamentos/:userId', authCookie.authCookieVerify, premiumTier.pagamentoPremiumVerify, pagamentoPedidos.pagamentoPedidosVerify, getUserPagamentos);
router.get('/Pagamento/:Id', authCookie.authCookieVerify, getPagamento);
router.get('/PagamentoPremiumNaoPago/:userId', authCookie.authCookieVerify, getPagamentoPremiumNaoPago);
router.get('/PagamentosPremium', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getPagamentosPremium);
router.get('/TopPagamentoPremium', authCookie.authCookieVerify, getTopPagamentoPremium);

router.post('/PagamentoPedido', authCookie.authCookieVerify, addPagamentoPedido);
router.post('/PagamentoPremium', authCookie.authCookieVerify, addPagamentoPremium);

router.put('/Pagamento/:Id', authCookie.authCookieVerify, updatePagamento);

module.exports = {
    routes: router
}