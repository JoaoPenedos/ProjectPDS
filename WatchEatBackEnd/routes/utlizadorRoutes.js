'use strict'
const express = require('express');
const utilizadorController = require('../controllers/utilizadorController');
const {authCookieVerify} = require("../middleware/authCookieVerify");
const router = express.Router();

const {getUtilizadores, getUtilizador, getUtilizadorAmizade, addUtlizador, addUtlizadorAmizade,
    updateUtilizador, updatePedidoAmizade, deleteUtilizador} = utilizadorController;

router.get('/Utilizadores', authCookieVerify , getUtilizadores);
router.get('/Utilizador/:Id', getUtilizador);
router.get('/UtilizadorAmizade/:Id', getUtilizadorAmizade);

router.post('/Utilizador', addUtlizador);
router.post('/UtilizadorAmizade/:Id', addUtlizadorAmizade);

router.put('/Utilizador/:Id', updateUtilizador);
router.put('/Utilizador/PedidoAmizade/:Id', updatePedidoAmizade);

router.delete('/Utilizador/:Id', deleteUtilizador);

module.exports = {
    routes: router
}