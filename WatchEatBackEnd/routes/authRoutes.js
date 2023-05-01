'use strict'
const express = require('express');
const authController = require('../controllers/authController');
const {authCookieVerify} = require("../middleware/authCookieVerify");
const router = express.Router();

const {authUtilizador, getUtilizador} = authController;

router.post('/authLogin', authUtilizador);
router.get("/getUser", getUtilizador);
router.post('/teste', authCookieVerify , (req, res) => {
    res.redirect("/pagina-inicial");
});

module.exports = {
    routes: router
}