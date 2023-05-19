'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const listBibliotecas = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado],[Biblioteca].[Visibilidade],[Biblioteca].[DataInsercao] ' +
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

const listBibliotecasByVisibilidade = async (Visibilidade) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado],[Biblioteca].[Visibilidade],[Biblioteca].[DataInsercao] ' +
            'FROM [dbo].[Biblioteca]' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = Biblioteca.UtilizadorId ' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = Biblioteca.ConteudoId ' +
            'WHERE [Visibilidade]=@Visibilidade';

        const list = await pool.request()
            .input('Visibilidade', sql.VarChar(255), Visibilidade)
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
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado],[Biblioteca].[Visibilidade],[Biblioteca].[DataInsercao] ' +
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

const listBibliotecaFilmesTop5ByUserId = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT TOP (5) [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado],[Biblioteca].[Visibilidade],[Biblioteca].[DataInsercao] ' +
            'FROM [dbo].[Biblioteca]' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = Biblioteca.UtilizadorId ' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = Biblioteca.ConteudoId ' +
            'JOIN [dbo].[Filme] ON Filme.ConteudoId = Conteudo.Id ' +
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

const listBibliotecaSeriesTop5ByUserId = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT TOP (5) [Biblioteca].[UtilizadorId],[Utilizador].[Nome] as Nome,[Utilizador].[Apelido],[Conteudo].[Nome] as Conteudo,' +
            '[Biblioteca].[Review],[Biblioteca].[Rating],[Biblioteca].[Estado],[Biblioteca].[Visibilidade],[Biblioteca].[DataInsercao] ' +
            'FROM [dbo].[Biblioteca]' +
            'JOIN [dbo].[Utilizador] ON Utilizador.Id = Biblioteca.UtilizadorId ' +
            'JOIN [dbo].[Conteudo] ON Conteudo.Id = Biblioteca.ConteudoId ' +
            'JOIN [dbo].[Serie] ON Serie.ConteudoId = Conteudo.Id ' +
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
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Biblioteca] ' +
            '([UtilizadorId],[ConteudoId],[Estado],[Visibilidade],[DataInsercao]) ' +
            'VALUES (@UtilizadorId, @ConteudoId, @Estado, @Visibilidade, @DataInsercao) ';

        const insertConteudo = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('ConteudoId', sql.Int, data.ConteudoId)
            .input('Estado', sql.VarChar(255), utils.estadosConteudosBiblioteca.EB_Assistindo)
            .input('Visibilidade', sql.VarChar(255), utils.visibilidadeBiblioteca.VB_Publica)
            .input('DataInsercao', sql.DateTime, sqlCurrentDateString)
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

const updateVisibilidadeBiblioteca = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Biblioteca] SET ';
        const inputParams = ['Visibilidade'];
        for (const param of inputParams) {
            query += data[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [UtilizadorId]=@uId`

        const update = await pool.request()
            .input('uId', sql.Int, uId)
            .input('Visibilidade', sql.VarChar(255), data.Visibilidade)
            .query(query);
        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    listBibliotecas,
    listBibliotecasByVisibilidade,
    listBibliotecaByUserId,
    listBibliotecaFilmesTop5ByUserId,
    listBibliotecaSeriesTop5ByUserId,
    createConteudoInBiblioteca,
    updateConteudoInBiblioteca,
    updateVisibilidadeBiblioteca
}