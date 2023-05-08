'use strict'
const express = require('express');
const utilizadorController = require('../controllers/utilizadorController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getUtilizadores, getUtilizador, getUtilizadorAmizade, addUtlizador, addUtlizadorAmizade,
    updateUtilizador, updatePedidoAmizade, deleteUtilizador} = utilizadorController;

router.get('/Utilizadores', authCookie.authCookieVerify, getUtilizadores);
router.get('/Utilizador/:Id', authCookie.authCookieVerify, getUtilizador);
router.get('/UtilizadorAmizade/:Id', authCookie.authCookieVerify, getUtilizadorAmizade);

router.post('/Utilizador', authCookie.authCookieVerify, addUtlizador);
router.post('/UtilizadorAmizade/:Id', authCookie.authCookieVerify, addUtlizadorAmizade);

router.put('/Utilizador/:Id', authCookie.authCookieVerify, updateUtilizador);
router.put('/Utilizador/PedidoAmizade/:Id', authCookie.authCookieVerify, updatePedidoAmizade);

router.delete('/Utilizador/:Id', authCookie.authCookieVerify, deleteUtilizador);

module.exports = {
    routes: router
}