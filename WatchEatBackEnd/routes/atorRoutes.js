'use strict'
const express = require('express');
const atorController = require('../controllers/atorController');
const router = express.Router();

const {getAtores, getAtor,
    addAtor, updateAtor, deleteAtor} = atorController;

router.get('/Atores', getAtores);
router.get('/Ator/:Id', getAtor);

router.post('/Ator', addAtor);

router.put('/Ator/:Id', updateAtor);

router.delete('/Ator/:Id', deleteAtor);


module.exports = {
    routes: router
}