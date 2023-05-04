'use strict'
const express = require('express');
const generoController = require('../controllers/generoController');
const authCookie = require("../middleware/authCookieVerify");
const router = express.Router();

const {getGeneros, getGeneroById, addGenero,
    updateGenero, deleteGenero} = generoController;

router.get('/Generos', getGeneros);
router.get('/Genero/:Id', getGeneroById);

router.post('/Genero/:Id', authCookie.authCookieVerify, addGenero);

router.put('/Genero/:Id', authCookie.authCookieVerify, updateGenero);

router.delete('/Genero/:Id', authCookie.authCookieVerify, deleteGenero);

module.exports = {
    routes: router
}