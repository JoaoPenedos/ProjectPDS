'use strict'
const jwt = require('jsonwebtoken');
const utilizadorData = require('../data/utilizadorService');
const utils = require('../utils/utils');

const checkRoleAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        const findUser = await utilizadorData.listUtilizadorById(user.user[0].Id);

        if (findUser[0].Utilizador_Roles === utils.user_roles.UR_Admin) {
            next();
        }
        else {
            return res.status(401).json({
                error: `Utilizador --> (${findUser[0].Id}) Não possui autorização para ver esta informação/página`
            });
        }
    }
    catch (error){
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

const checkRolePremium = async (req, res, next) => {
    const token = req.cookies.token;

    try{
        const user = jwt.verify(token, process.env.SECRET_TOKEN);
        const findUser = await utilizadorData.listUtilizadorById(user.user[0].Id);

        if (findUser[0].Utilizador_Roles === utils.user_roles.UR_Premium || findUser[0].Utilizador_Roles === utils.user_roles.UR_Admin ) {
            next();
        }
        else {
            return res.status(401).json({
                error: `Utilizador --> (${findUser[0].Id}) Não possui autorização para ver esta informação/página`
            });
        }
    }
    catch (error){
        res.clearCookie("token");
        return res.redirect("/login");
    }
}

module.exports = {
    checkRoleAdmin,
    checkRolePremium
}