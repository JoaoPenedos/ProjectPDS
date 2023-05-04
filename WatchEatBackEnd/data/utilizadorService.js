'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const listUtilizadores = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Nome],[Apelido],[Email],[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado],[Utilizador_Roles]' +
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
        let query = 'SELECT [Id],[Nome],[Apelido],[Email],[NTelemovel],[Morada],[NIF],[ImagemPerfil],[Estado],[Utilizador_Roles]' +
            'FROM [dbo].[Utilizador]' +
            'WHERE [Id] = @Id';

        const oneUtilizador = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return oneUtilizador.recordset;
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

const listUtilizadorAmizades = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[DataPedidoAceite],[Estado]' +
            'FROM [dbo].[Utilizador_Utilizador]' +
            'WHERE [UtilizadorId] = @UtilizadorId';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .query(query);

        return oneUtilizador.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listAmizade = async (Id, Id2)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[DataPedidoAceite],[Estado]' +
            'FROM [dbo].[Utilizador_Utilizador]' +
            'WHERE [UtilizadorId] = @UtilizadorId AND [UtilizadorId2] = @UtilizadorId2';

        const oneUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('UtilizadorId2', sql.Int, Id2)
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
            '([Nome],[Apelido],[Email],[Password],[NTelemovel],[Estado],[Utilizador_Roles]) ' +
            'VALUES (@Nome, @Apelido, @Email, @Password, @NTelemovel, @Estado, @Utilizador_Roles) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('Nome', sql.VarChar(255), utilizadorData.Nome)
            .input('Apelido', sql.VarChar(255), utilizadorData.Apelido)
            .input('Email', sql.VarChar(255), utilizadorData.Email)
            .input('Password', sql.VarChar(255), utilizadorData.Password)
            .input('NTelemovel', sql.Int, utilizadorData.NTelemovel)
            .input('Estado', sql.VarChar(255), utils.estadosUtilizadores.EU_Ativo)
            .input('Utilizador_Roles', sql.VarChar(255), utils.user_roles.UR_Normal)
            .query(query);

        return insertUtilizador.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createNewRegisterUtilizador = async (utilizadorData) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador] ' +
            '([Email],[Password],[Estado],[Utilizador_Roles]) ' +
            'VALUES (@Email, @Password, @Estado, @Utilizador_Roles) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('Email', sql.VarChar(255), utilizadorData.Email)
            .input('Password', sql.VarChar(255), utilizadorData.Password)
            .input('Estado', sql.VarChar(255), utils.estadosUtilizadores.EU_Ativo)
            .input('Utilizador_Roles', sql.VarChar(255), utils.user_roles.UR_Normal)
            .query(query);

        return insertUtilizador.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const createPedidoAmizade = async (Id, utilizadorData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Utilizador_Utilizador] ' +
            '([UtilizadorId],[UtilizadorId2],[DataPedidoEnviado],[Estado]) ' +
            'VALUES (@UtilizadorId, @UtilizadorId2, @DataPedidoEnviado, @Estado) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertUtilizador = await pool.request()
            .input('UtilizadorId', sql.Int, Id)
            .input('UtilizadorId2', sql.Int, utilizadorData.UtilizadorId2)
            .input('DataPedidoEnviado', sql.DateTime, sqlCurrentDateString)
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.EA_PedidoEnviado)
            .query(query);

        return insertUtilizador.recordset;
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

const updateRolesUtilizador = async (Id, Utilizador_Roles) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Utilizador] SET Utilizador_Roles = @Utilizador_Roles ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Utilizador_Roles', sql.VarChar(255), Utilizador_Roles)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updatePedidoAmizade = async (Id, utilizadorData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

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
            .input('DataPedidoAceite', sql.DateTime, sqlCurrentDateString)
            .input('Estado', sql.VarChar(255), utils.estadosAmizade.EA_Amigos)
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
    listUtilizadorAmizades,
    listAmizade,
    createUtilizador,
    createNewRegisterUtilizador,
    createPedidoAmizade,
    updateUtilizador,
    updateRolesUtilizador,
    updatePedidoAmizade,
    deleteUtilizador,
    deletePedidoAmizade
}