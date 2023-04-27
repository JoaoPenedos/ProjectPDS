'use strict'
const express = require('express');
const estafetaController = require('../controllers/estafetaController');
const router = express.Router();

const {getEstafetas, getEstafeta, addEstafeta, updateEstafeta, deleteEstafeta} = estafetaController;

router.get('/Estafetas', getEstafetas);
router.get('/Estafeta/:Id', getEstafeta);
router.post('/Estafeta', addEstafeta);
router.put('/Estafeta/:Id', updateEstafeta);
router.delete('/Estafeta/:Id', deleteEstafeta);

module.exports = {
    routes: router
}