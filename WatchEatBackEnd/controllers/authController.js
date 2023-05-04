'use strict'

const jwt = require('jsonwebtoken');
const utilizadoresData = require('../data/utilizadorService');

/*
const data = { }
data["data"] = ` ${Email} ${Password}` // ${user[0].Password}`
 */

const getUtilizador = async (req, res)=> {
    try {
        const email = req.body.Email;
        const user = await utilizadoresData.listUtilizadorByEmail(email);

        res.send(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const authUtilizador = async (req, res)=> {
    try {
        const { Email, Password } = req.body;
        const user = await utilizadoresData.listUtilizadorByEmail(Email);

        if (!user || !user.length || user[0].Password != Password) {
            return res.status(403).json({
                error: "invalid login"
            });
        }

        delete user[0].Password;

        const token = jwt.sign({user}, process.env.SECRET_TOKEN, { expiresIn: "1h"});

        res.cookie("token", token,{
            httpOnly: true,
        })

        res.redirect("/pagina-inicial");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const registerUtilizador = async (req, res)=> {
    try {
        const { Email, Password, confirm_password } = req.body;
        const user = await utilizadoresData.listUtilizadorByEmail(Email);

        if (Object.keys(user).length > 0) {
            if (user[0].Email == Email) {
                return res.status(409).json({
                    error: "email already in use"
                });
            }
        }

        if (Password !== confirm_password) {
            return res.status(409).json({
                error: "Password doesn't match confirm_password field"
            });
        }

        const newUserdata = req.body;
        const newUser = await utilizadoresData.createNewRegisterUtilizador(newUserdata);

        const token = jwt.sign({newUser}, process.env.SECRET_TOKEN, { expiresIn: "1h"});

        res.cookie("token", token,{
            httpOnly: true,
        })

        res.redirect("/pagina-inicial");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getUtilizador,
    authUtilizador,
    registerUtilizador
}