'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const listConteudos = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]' +
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
        let query = 'SELECT [Id],[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]' +
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
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId';

        const conteudosFilmes = await pool.request()
            .query(query);

        return conteudosFilmes.recordset;
    }
    catch (error) {
        return  error.message;
    }
}
const listConteudoFilme = async (ConteudoId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId ' +
            'WHERE [ConteudoId] = @ConteudoId';

        const conteudoFilme = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return conteudoFilme.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listConteudoFilmeByNome = async (ConteudoNome)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[Duracao],[Filme].[Id] as filmeId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Filme] ON Conteudo.Id = Filme.ConteudoId ' +
            'WHERE [Nome] = @ConteudoNome';

        const conteudoFilme = await pool.request()
            .input('ConteudoNome', sql.VarChar(255), ConteudoNome)
            .query(query);

        return conteudoFilme.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listConteudosSeries = async ()=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId';

        const conteudosSeries = await pool.request()
            .query(query);

        return conteudosSeries.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listConteudoSerie = async (ConteudoId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
           '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId ' +
            'WHERE [ConteudoId] = @ConteudoId';

        const conteudosSeries = await pool.request()
            .input('ConteudoId', sql.Int, ConteudoId)
            .query(query);

        return conteudosSeries.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listConteudoSerieByNome = async (ConteudoNome)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Conteudo].[Id] as conteudoId,[Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],' +
            '[Trailer],[NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[Serie].[Id] as serieId ' +
            'FROM [dbo].[Conteudo] ' +
            'JOIN [dbo].[Serie] ON Conteudo.Id = Serie.ConteudoId ' +
            'WHERE [Nome] = @ConteudoNome';

        const conteudosSeries = await pool.request()
            .input('ConteudoNome', sql.VarChar(255), ConteudoNome)
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
            '([Nome],[Poster],[Realizador],[Rating],[DataReleased],[Sinopse],[Trailer]) ' +
            'VALUES (@Nome, @Poster, @Realizador, @Rating, @DataReleased, @Sinopse, @Trailer); ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Poster', sql.VarChar(sql.MAX), conteudoData.Poster)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .input('Sinopse', sql.VarChar(255), conteudoData.Sinopse)
            .input('Trailer', sql.VarChar(sql.MAX), conteudoData.Trailer)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createConteudoFilme = async (conteudoData, contId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Filme] ' +
            '([Duracao],[ConteudoId]) ' +
            'VALUES (@Duracao, @ConteudoId)';

        const insertFilme = await pool.request()
            .input('Duracao', sql.VarChar(255), conteudoData.Duracao)
            .input('ConteudoId', sql.Int, contId)
            .query(query);

        return insertFilme.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createConteudoSerie = async (conteudoData, contId) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Serie] ' +
            '([NTemporadas],[Estado],[DataFim],[NEpisodiosTotais],[ConteudoId]) ' +
            'VALUES (@NTemporadas, @Estado, @DataFim, @NEpisodiosTotais, @ConteudoId)';

        const insertSerie = await pool.request()
            .input('NTemporadas', sql.Int, conteudoData.NTemporadas)
            .input('Estado', sql.VarChar(255), conteudoData.Estado)
            .input('DataFim', sql.Date, conteudoData.DataFim)
            .input('NEpisodiosTotais', sql.Int, conteudoData.NEpisodiosTotais)
            .input('ConteudoId', sql.Int, contId)
            .query(query);

        return insertSerie.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updateConteudo = async (Id, conteudoData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Conteudo] SET ';
        const inputParams = ['Nome', 'Poster', 'Realizador', 'Rating', 'DataReleased', 'Sinopse', 'Trailer'];
        for (const param of inputParams) {
            query += conteudoData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), conteudoData.Nome)
            .input('Poster', sql.VarChar(sql.MAX), conteudoData.Poster)
            .input('Realizador', sql.VarChar(255), conteudoData.Realizador)
            .input('Rating', sql.Real, conteudoData.Rating)
            .input('DataReleased', sql.Date, conteudoData.DataReleased)
            .input('Sinopse', sql.VarChar(255), conteudoData.Sinopse)
            .input('Trailer', sql.VarChar(sql.MAX), conteudoData.Trailer)
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
    listConteudoFilme,
    listConteudoFilmeByNome,
    listConteudosSeries,
    listConteudoSerie,
    listConteudoSerieByNome,
    createConteudo,
    createConteudoFilme,
    createConteudoSerie,
    updateConteudo,
    deleteConteudo
}