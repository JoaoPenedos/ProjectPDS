'use strict'
const express = require('express');
const conteudoController = require('../controllers/conteudoController');
const router = express.Router();

const {getConteudos, getConteudo, getConteudosFilmes, getConteudosSeries,
    addConteudo, addConteudoFilme, addConteudoSerie,
    updateConteudo, deleteConteudo} = conteudoController;

router.get('/Conteudos', getConteudos);
router.get('/Conteudo/:Id', getConteudo);
router.get('/Conteudos/Filmes', getConteudosFilmes);
router.get('/Conteudos/Series', getConteudosSeries);

router.post('/Conteudo', addConteudo);
router.post('/Conteudo/Filme', addConteudoFilme);
router.post('/Conteudo/Serie', addConteudoSerie);

router.put('/Conteudo/:Id', updateConteudo);

router.delete('/Conteudo/:Id', deleteConteudo);

module.exports = {
    routes: router
}