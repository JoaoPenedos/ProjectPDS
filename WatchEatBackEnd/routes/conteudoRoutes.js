'use strict'
const express = require('express');
const conteudoController = require('../controllers/conteudoController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getConteudos, get10RandomConteudos, getConteudoById, getConteudoByNome, getConteudosFilmes, getConteudosSeries,
    addConteudo, addConteudoFilme, addConteudoSerie,
    updateConteudo, deleteConteudo} = conteudoController;

router.get('/Conteudos', getConteudos);
router.get('/ConteudosRandom10', get10RandomConteudos);
router.get('/Conteudo/:Id', getConteudoById);
router.get('/Conteudo/:Nome', getConteudoByNome);
router.get('/Conteudos/Filmes', getConteudosFilmes);
router.get('/Conteudos/Series', getConteudosSeries);

router.post('/Conteudo', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addConteudo);
router.post('/Conteudo/Filme', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addConteudoFilme);
router.post('/Conteudo/Serie', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, addConteudoSerie);

router.put('/Conteudo/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, updateConteudo);

router.delete('/Conteudo/:Id', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, deleteConteudo);

module.exports = {
    routes: router
}