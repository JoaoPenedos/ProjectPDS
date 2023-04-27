'use strict'
const express = require('express');
const utilizadorController = require('../controllers/utilizadorController');
const router = express.Router();

const {getUtilizadores, getUtilizador, addUtlizador, updateUtilizador, deleteUtilizador} = utilizadorController;

router.get('/Utilizadores', getUtilizadores);
router.get('/Utilizador/:Id', getUtilizador);
router.post('/Utilizador', addUtlizador);
router.put('/Utilizador/:Id', updateUtilizador);
router.delete('/Utilizador/:Id', deleteUtilizador);

module.exports = {
    routes: router
}