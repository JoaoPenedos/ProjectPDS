'use strict'
const express = require('express');
const reviewPremiumController = require('../controllers/reviewsPremiumController');
const authCookie = require("../middleware/authCookieVerify");
const checkRoles = require("../middleware/rolesAuthorization");
const router = express.Router();

const {getReviewsPremium, getReviewsPremiumByUserId, getReviewsPremiumByConteudoId, addReviewPremium,
    updateReviewPremium, deleteReviewPremium, deleteUserReviewsPremium} = reviewPremiumController;

router.get('/ReviewsPremium', authCookie.authCookieVerify, checkRoles.checkRoleAdmin, getReviewsPremium);
router.get('/ReviewsPremiumUser/:userId', authCookie.authCookieVerify, getReviewsPremiumByUserId);
router.get('/ReviewsPremiumCont/:contId', authCookie.authCookieVerify, getReviewsPremiumByConteudoId);

router.post('/ReviewPremium/:userId', authCookie.authCookieVerify, checkRoles.checkRolePremium, addReviewPremium);

router.put('/ReviewPremium/:userId', authCookie.authCookieVerify, checkRoles.checkRolePremium, updateReviewPremium);

router.delete('/ReviewPremium/:userId', authCookie.authCookieVerify, checkRoles.checkRolePremium, deleteReviewPremium);
router.delete('/UserReviewsPremium/:userId', authCookie.authCookieVerify, checkRoles.checkRolePremium, deleteUserReviewsPremium);

module.exports = {
    routes: router
}