'use strict'
const express = require('express');
const utilizadorController = require('../controllers/utilizadorController');
const {authCookieVerify} = require("../middleware/authCookieVerify");
const router = express.Router();

const {getUtilizadores, getUtilizador, addUtlizador, addUtlizadorAmizade,
    updateUtilizador, updatePedidoAmizade, deleteUtilizador} = utilizadorController;

router.get('/Utilizadores', authCookieVerify , getUtilizadores);
router.get('/Utilizador/:Id', getUtilizador);

router.post('/Utilizador', addUtlizador);
router.post('/Utilizador/:Id', addUtlizadorAmizade);

router.put('/Utilizador/:Id', updateUtilizador);
router.put('/Utilizador/PedidoAmizade/:Id', updatePedidoAmizade);

router.delete('/Utilizador/:Id', deleteUtilizador);

module.exports = {
    routes: router
}