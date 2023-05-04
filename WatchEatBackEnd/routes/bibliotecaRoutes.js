'use strict'
const express = require('express');
const bibliotecaController = require('../controllers/bibliotecaController');
const router = express.Router();

const {getBibliotecas, getBiblioteca, getBibliotecasByVisibilidade,
    addConteudoInBiblioteca, updateConteudoInBiblioteca} = bibliotecaController;

router.get('/Bibliotecas', getBibliotecas);
router.get('/BibliotecasByVisibilidade', getBibliotecasByVisibilidade);
router.get('/Biblioteca/:userId', getBiblioteca);

router.post('/Biblioteca/:userId', addConteudoInBiblioteca);

router.put('/Biblioteca/:userId', updateConteudoInBiblioteca);


module.exports = {
    routes: router
}