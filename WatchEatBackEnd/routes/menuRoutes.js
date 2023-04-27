'use strict'
const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

const {getMenus, getMenu, addMenu, updateMenu, deleteMenu} = menuController;

router.get('/Menus', getMenus);
router.get('/Menu/:Id', getMenu);
router.post('/Menu', addMenu);
router.put('/Menu/:Id', updateMenu);
router.delete('/Menu/:Id', deleteMenu);

module.exports = {
    routes: router
}