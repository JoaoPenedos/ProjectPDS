'use strict'
const express = require('express');
const authCookie = require("../middleware/authCookieVerify");
const estatisticas = require("../middleware/estatisticas");
const router = express.Router();

router.get('/Estatisticas', authCookie.authCookieVerify, estatisticas.getEstatisticas);

module.exports = {
    routes: router
}