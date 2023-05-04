'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const listBibliotecas = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado] ' +
            'FROM [dbo].[Biblioteca]' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = Biblioteca.UtilizadorId ' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = Biblioteca.ConteudoId';

        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}
const listBibliotecaByUserId = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado] ' +
            'FROM [dbo].[Biblioteca]' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = Biblioteca.UtilizadorId ' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = Biblioteca.ConteudoId ' +
            'WHERE [Biblioteca].[UtilizadorId] = @Id';

        const list = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createConteudoInBiblioteca = async (Id, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Biblioteca] ' +
            '([UtilizadorId],[ConteudoId],[Estado]) ' +
            'VALUES (@UtilizadorId, @ConteudoId, @Estado) ';

        const insertConteudo = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('ConteudoId', sql.Int, data.ConteudoId)
            .input('Estado', sql.VarChar(255), utils.estadosConteudosBiblioteca.EB_Assistindo)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updateConteudoInBiblioteca = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Biblioteca] SET ';
        const inputParams = ['Review', 'Rating', 'Estado'];
        for (const param of inputParams) {
            query += data[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [UtilizadorId]=@uId AND [ConteudoId]=@cId`

        const update = await pool.request()
            .input('uId', sql.Int, uId)
            .input('cId', sql.Int, data.cId)
            .input('Review', sql.VarChar(255), data.Review)
            .input('Rating', sql.Real, data.Rating)
            .input('Estado', sql.VarChar(255), data.Estado)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    listBibliotecas,
    listBibliotecaByUserId,
    createConteudoInBiblioteca,
    updateConteudoInBiblioteca
}