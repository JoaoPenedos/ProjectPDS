'use strict';

const config = require('../../config');
const sql = require('mssql');
const utils = require('../utils');

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

const listConteudosFilmes = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.conteudoId';

        const conteudosFilmes = await pool.request()
            .query(query);

        return conteudosFilmes.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listConteudosSeries = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.conteudoId';

        const conteudosSeries = await pool.request()
            .query(query);

        return conteudosSeries.recordset;
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

const createConteudoFilme = async (conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo] ' +
            '([Nome],[Realizador],[Rating],[DataReleased]) ' +
            'VALUES (@Nome, @Realizador, @Rating, @DataReleased) ' +
            'SELECT SCOPE_IDENTITY() AS Id';
        let query2 = 'INSERT INTO [dbo].[Filme] ' +
            '([Duracao],[conteudoId]) ' +
            'VALUES (@Duracao, @conteudoId)';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Time, conteudoData.DataReleased)
            .query(query);

        const insertFilme = await pool.request()
            .input('Duracao', sql.VarChar(255), conteudoData.Duracao)
            .input('conteudoId', sql.Int, insertConteudo.recordset[0].Id)
            .query(query2);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createConteudoSerie = async (conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Conteudo] ' +
            '([Nome],[Realizador],[Rating],[DataReleased]) ' +
            'VALUES (@Nome, @Realizador, @Rating, @DataReleased) ' +
            'SELECT SCOPE_IDENTITY() AS Id';
        let query2 = 'INSERT INTO [dbo].[Serie] ' +
            '([NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[conteudoId]) ' +
            'VALUES (@NTemporadas, @Estado, @DataFim, @NEpisodiosTotais, @conteudoId)';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .query(query);

        const insertSerie = await pool.request()
            .input('NTemporadas', sql.Int, conteudoData.NTemporadas)
            .input('Estado', sql.VarChar(255), conteudoData.Estado)
            .input('DataFim', sql.Date, conteudoData.DataFim)
            .input('NEpisodiosTotais', sql.Int, conteudoData.NEpisodiosTotais)
            .input('conteudoId', sql.Int, insertConteudo.recordset[0].Id)
            .query(query2);

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
    listConteudosFilmes,
    listConteudosSeries,
    createConteudo,
    createConteudoFilme,
    createConteudoSerie,
    updateConteudo,
    deleteConteudo
}