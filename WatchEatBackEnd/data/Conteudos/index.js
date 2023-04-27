'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const listConteudos = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Conteudos');
        const list = await pool.request()
            .query(sqlQueries.listConteudos);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const listConteudoById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Conteudos');
        const oneConteudo = await pool.request()
            .input('Id', sql.Int, Id)
            .query(sqlQueries.listConteudoById);

        return oneConteudo.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const createConteudo = async (conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Conteudos');
        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .query(sqlQueries.createConteudo);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updateConteudo = async (Id, conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Conteudos');
        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .input('Sinopse', sql.VarChar(255), conteudoData.Sinopse)
            .query(sqlQueries.updateConteudo);
        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const deleteConteudo = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('Conteudos');
        const deleted = await pool.request()
            .input('Id', sql.Int, Id)
            .query(sqlQueries.deleteConteudo);
        return deleted.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    listConteudos,
    listConteudoById,
    createConteudo,
    updateConteudo,
    deleteConteudo
}