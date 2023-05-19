'use strict'
const express = require('express');
const bibliotecaController = require('../controllers/bibliotecaController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getBibliotecas, getBibliotecasByVisibilidade, getBiblioteca, getBibliotecaFilmesTop5, getBibliotecaSeriesTop5,
    addConteudoInBiblioteca, updateConteudoInBiblioteca, updateVisibilidadeBiblioteca} = bibliotecaController;

router.get('/Bibliotecas', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getBibliotecas);
router.get('/BibliotecasByVisibilidade', authCookie.authCookieVerify, getBibliotecasByVisibilidade);
router.get('/Biblioteca/:userId', authCookie.authCookieVerify, getBiblioteca);
router.get('/BibliotecaFilmesTop6/:userId', authCookie.authCookieVerify, getBibliotecaFilmesTop5);
router.get('/BibliotecaSeriesTop6/:userId', authCookie.authCookieVerify, getBibliotecaSeriesTop5);

router.post('/Biblioteca/:userId', authCookie.authCookieVerify, addConteudoInBiblioteca);

router.put('/Biblioteca/:userId', authCookie.authCookieVerify, updateConteudoInBiblioteca);
router.put('/BibliotecaVisibilidade/:userId', authCookie.authCookieVerify, checkRoles.checkRolePremium, updateVisibilidadeBiblioteca);


module.exports = {
    routes: router
}