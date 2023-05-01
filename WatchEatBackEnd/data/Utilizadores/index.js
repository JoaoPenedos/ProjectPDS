'use strict';

const config = require('../../config');
const sql = require('mssql');
const utils = require('../utils');

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

const listUtilizadorByEmail = async (Email)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Email],[Password]' +
            'FROM [dbo].[Utilizador]' +
            'WHERE [Email] = @Email';

        const oneUtilizador = await pool.request()
            .input('Email', sql.VarChar(255), Email)
            .query(query);

        return oneUtilizador.recordset;
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
            .input('Estado', sql.VarChar(255), utils.estadosUtilizadores.UserState1)
            .query(query);

        return insertConteudo.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createPedidoAmizade = async (Id, utilizadorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador_Utilizador] ' +
            '([UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[DataPedidoAceite],[Estado]) ' +
            'VALUES (@UtilizadorId, @UtilizadorId2, @DataPedidoEnviado, @DataPedidoAceite, @Estado) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertConteudo = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('UtilizadorId2', sql.Int, utilizadorData.UtilizadorId2)
            .input('DataPedidoEnviado', sql.Date, Date())
            .input('DataPedidoAceite', sql.Date, Date()) // campo a retirar
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.AmizadeState2)
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

const updatePedidoAmizade = async (Id, utilizadorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador_Utilizador] SET ';
        const inputParams = ['DataPedidoAceite', 'Estado'];
        for (const param of inputParams) {
            query += utilizadorData[param] ? `${param} = @${param}, ` : '';
        }
        query = query.slice(0, -2); // remove trailing comma and space
        query +=` WHERE [UtilizadorId]=@uId AND [UtilizadorId2]=@uId2`

        const update = await pool.request()
            .input('uId', sql.Int, Id)
            .input('uId2', sql.Int, utilizadorData.uId2)
            .input('DataPedidoAceite', sql.VarChar(255), Date())
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.AmizadeState1)
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

const deletePedidoAmizade = async (uId, data) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'DELETE [dbo].[Utilizador_Utilizador] ' +
            'WHERE [UtilizadorId]=@uId AND [UtilizadorId2]=@uId2;'

        const deleted = await pool.request()
            .input('uId', sql.Int, uId)
            .input('uId2', sql.Int, data.uId2)
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
    listUtilizadorByEmail,
    createUtilizador,
    createPedidoAmizade,
    updateUtilizador,
    updatePedidoAmizade,
    deleteUtilizador,
    deletePedidoAmizade
}