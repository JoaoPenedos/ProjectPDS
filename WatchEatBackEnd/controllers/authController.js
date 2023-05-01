'use strict'

const jwt = require('jsonwebtoken');
const utilizadoresData = require('../data/Utilizadores');

const authUtilizador = async (req, res)=> {
    try {
        const { Email, Password } = req.body;
        const user = await utilizadoresData.listUtilizadorByEmail(Email);

        if (!user || !user.length || user[0].Password != Password) {
            const data = { }
            data["data"] = ` ${Email} ${Password}` // ${user[0].Password}`
            return res.status(403).json({user, data
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

module.exports = {
    authUtilizador,
    getUtilizador
}