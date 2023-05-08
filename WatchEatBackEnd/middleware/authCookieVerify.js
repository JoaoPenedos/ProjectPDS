'use strict'
const jwt = require('jsonwebtoken');

const authCookieVerify = async (req, res, next) => {
    const token = req.cookies.token;

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = {user};
        next();
    }
    catch (error){
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

const logOutClearCookie = async (req, res, next) => {
    res.clearCookie("token");
    return res.redirect("/login");
}

const testeMiddleware = async (req, res, next) => {
    next();
}

module.exports = {
    authCookieVerify,
    logOutClearCookie,
    testeMiddleware,
}