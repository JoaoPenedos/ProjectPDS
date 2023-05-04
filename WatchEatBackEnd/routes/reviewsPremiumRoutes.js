'use strict'
const express = require('express');
const reviewPremiumController = require('../controllers/reviewsPremiumController');
const authCookie = require("../middleware/authCookieVerify");
const router = express.Router();

const {getReviewsPremium, getReviewsPremiumByUserId, getReviewsPremiumByConteudoId, addReviewPremium,
    updateReviewPremium, deleteReviewPremium, deleteUserReviewsPremium} = reviewPremiumController;

router.get('/ReviewsPremium', authCookie.authCookieVerify, getReviewsPremium);
router.get('/ReviewsPremiumUser/:userId', authCookie.authCookieVerify, getReviewsPremiumByUserId);
router.get('/ReviewsPremiumCont/:contId', /*authCookie.authCookieVerify,*/ getReviewsPremiumByConteudoId);

router.post('/ReviewPremium/:userId', authCookie.authCookieVerify, addReviewPremium);

router.put('/ReviewPremium/:userId', authCookie.authCookieVerify, updateReviewPremium);

router.delete('/ReviewPremium/:userId', authCookie.authCookieVerify, deleteReviewPremium);
router.delete('/UserReviewsPremium/:userId', authCookie.authCookieVerify, deleteUserReviewsPremium);

module.exports = {
    routes: router
}