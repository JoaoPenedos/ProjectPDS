'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const createConteudoGenero = async (ConteudoId, GeneroId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo_Genero] (ConteudoId, GeneroId) ' +
            'VALUES (@ConteudoId, @GeneroId)' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudoGenero = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .input('GeneroId', sql.Int, GeneroId)
            .query(query);

        return insertConteudoGenero.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    createConteudoGenero
}