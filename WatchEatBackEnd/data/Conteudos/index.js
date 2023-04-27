'use strict';

const config = require('../../config');
const sql = require('mssql');

const listConteudos = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse]' +
            'FROM [dbo].[Conteudo]';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const listConteudoById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse]' +
            'FROM [dbo].[Conteudo]' +
            'WHERE [Id] = @Id';

        const oneConteudo = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return oneConteudo.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const createConteudo = async (conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo] ' +
            '([Nome],[Realizador],[Rating],[DataReleased]) ' +
            'VALUES (@Nome, @Realizador, @Rating, @DataReleased) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updateConteudo = async (Id, conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Conteudo] SET ';
        const inputParams = ['Nome', 'Poster', 'Realizador', 'Rating', 'DataReleased', 'Sinopse'];
        for (const param of inputParams) {
            query += conteudoData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .input('Sinopse', sql.VarChar(255), conteudoData.Sinopse)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const deleteConteudo = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Conteudo] WHERE [Id]=@Id;'

        const deleted = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
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