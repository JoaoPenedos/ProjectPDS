'use strict'
const express = require('express');
const authController = require('../controllers/authController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {authUtilizador, getUtilizador, registerUtilizador} = authController;

router.get("/getUser", getUtilizador);

router.post('/authLogin', authUtilizador);
router.post('/authRegister', registerUtilizador);

router.post('/teste', authCookie.authCookieVerify, checkRoles.checkRoleAdmin , (req, res) => {
    res.redirect("/pagina-inicial");
});

module.exports = {
    routes: router
}