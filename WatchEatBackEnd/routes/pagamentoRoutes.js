'use strict'
const express = require('express');
const pagamentoController = require('../controllers/pagamentoController');
const authCookie = require("../middleware/authCookieVerify");
const premiumTier = require("../middleware/premiumTier");
const router = express.Router();

const {getPagamentos, getUserPagamentos, getPagamento, getPagamentosPremium, getTopPagamentoPremium, addPagamentoPedido, addPagamentoPremium,
    updatePagamento } = pagamentoController;

router.get('/Pagamentos', authCookie.authCookieVerify, getPagamentos);
router.get('/UserPagamentos', authCookie.authCookieVerify, premiumTier.pagamentoPremiumVerify, getUserPagamentos);
router.get('/Pagamento/:Id', authCookie.authCookieVerify, getPagamento);
router.get('/PagamentosPremium', authCookie.authCookieVerify, getPagamentosPremium);
router.get('/TopPagamentoPremium', authCookie.authCookieVerify, getTopPagamentoPremium);

router.post('/PagamentoPedido', authCookie.authCookieVerify, addPagamentoPedido);
router.post('/PagamentoPremium', authCookie.authCookieVerify, addPagamentoPremium);

router.put('/Pagamento/:Id', authCookie.authCookieVerify, updatePagamento);

module.exports = {
    routes: router
}