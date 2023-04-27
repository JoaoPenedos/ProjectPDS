'use strict'
const express = require('express');
const conteudoController = require('../controllers/conteudoController');
const router = express.Router();

const {getConteudos, getConteudo, addConteudo, updateConteudo, deleteConteudo} = conteudoController;

router.get('/Conteudos', getConteudos);
router.get('/Conteudo/:Id', getConteudo);
router.post('/Conteudo', addConteudo);
router.put('/Conteudo/:Id', updateConteudo);
router.delete('/Conteudo/:Id', deleteConteudo);

module.exports = {
    routes: router
}