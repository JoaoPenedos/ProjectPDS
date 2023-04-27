'use strict';

const config = require('../../config');
const sql = require('mssql');

const estadosUtilizadores = {
    UserState1: 'Ativo',
    UserState2: 'Suspenso',
    UserState3: 'Bloqueado'
}

const listUtilizadores = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Email],[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado]' +
            'FROM [dbo].[Utilizador]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const listUtilizadorById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Email],[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado]' +
            'FROM [dbo].[Utilizador]' +
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

const createUtilizador = async (utilizadorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador] ' +
            '([Nome],[Apelido],[Email],[Password],[NTelemovel],[Estado]) ' +
            'VALUES (@Nome, @Apelido, @Email, @Password, @NTelemovel, @Estado) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('Nome', sql.VarChar(255), utilizadorData.Nome)
            .input('Apelido', sql.VarChar(255), utilizadorData.Apelido)
            .input('Email', sql.VarChar(255), utilizadorData.Email)
            .input('Password', sql.VarChar(255), utilizadorData.Password)
            .input('NTelemovel', sql.Int, utilizadorData.NTelemovel)
            .input('Estado', sql.VarChar(255), estadosUtilizadores.UserState1)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updateUtilizador = async (Id, utilizadorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET ';
        const inputParams = ['Nome', 'Apelido', 'NTelemovel', 'Morada', 'NIF'];
        for (const param of inputParams) {
            query += utilizadorData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [Id]=@Id`

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Nome', sql.VarChar(255), utilizadorData.Nome)
            .input('Apelido', sql.VarChar(255), utilizadorData.Apelido)
            .input('NTelemovel', sql.Int, utilizadorData.NTelemovel)
            .input('Morada', sql.VarChar(255), utilizadorData.Morada)
            .input('NIF', sql.VarChar(255), utilizadorData.NIF)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const deleteUtilizador = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Utilizador] WHERE [Id]=@Id;'

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
    listUtilizadores,
    listUtilizadorById,
    createUtilizador,
    updateUtilizador,
    deleteUtilizador
}