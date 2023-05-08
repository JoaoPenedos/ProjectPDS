'use strict'
const express = require('express');
const authController = require('../controllers/authController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const checkAlteracaoCount = require("../middleware/editorConteudo");
const router = express.Router();

const {getUtilizador, authUtilizador, registerUtilizador} = authController;

router.get("/getUser", getUtilizador);

router.post('/authLogin', checkAlteracaoCount.alteracoesCountVerifyOnLogin, authUtilizador);
router.post('/authRegister', registerUtilizador);

router.post('/teste', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, (req, res) => {
    res.redirect("/pagina-inicial");
});

module.exports = {
    routes: router
}