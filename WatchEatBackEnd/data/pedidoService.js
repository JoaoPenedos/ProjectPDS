'use strict';

const config = require('../config');
const sql = require('mssql');
const utils = require('../utils/utils');

const listPedidos = async () => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido]';
        const list = await pool.request()
            .query(query);
        return list.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const listPedidoById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido] ' +
            'WHERE [Id] = @Id';

        const onePedido = await pool.request()
            .input('Id', sql.Int, Id)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listPedidoPagamentoById = async (Id)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId],[ValorPagar],[DataEmissao]' +
            'FROM [dbo].[Pedido] ' +
            'JOIN [Pagamento] ON [Pagamento].[PedidoId] = [Pedido].[Id]' +
            'WHERE [Id] = @Id AND [TipoPagamento]=@TipoPagamento';

        const onePedido = await pool.request()
            .input('Id', sql.Int, Id)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listPedidoPagamentoByUserId = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Pedido].[Id],[Pedido].[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Pedido].[Estado],[Pedido].[UtilizadorId],[EstafetaId],' +
            '[ValorPagar],[DataEmissao],[Pagamento].[Id] as PagamentoId ' +
            'FROM [dbo].[Pedido] ' +
            'JOIN [Pagamento] ON [Pagamento].[PedidoId] = [Pedido].[Id]' +
            'WHERE [Pedido].[UtilizadorId] = @UtilizadorId AND [TipoPagamento]=@TipoPagamento';

        const onePedido = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .input('TipoPagamento', sql.VarChar(255), "Pedido")
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const listPedidosByUserId = async (UtilizadorId)=> {
    try {
        let pool = await  sql.connect(config.sql);
        let query = 'SELECT [Id],[Descricao],[Morada],[HoraReservada],[HoraReserva],[HoraEntrega],' +
            '[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]' +
            'FROM [dbo].[Pedido] ' +
            'WHERE [UtilizadorId] = @UtilizadorId';

        const onePedido = await pool.request()
            .input('UtilizadorId', sql.Int, UtilizadorId)
            .query(query);

        return onePedido.recordset;
    }
    catch (error) {
        return  error.message;
    }
}

const createPedido = async (pedidoData) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'INSERT INTO [dbo].[Pedido] ' +
            '([Descricao],[Morada],[HoraReservada],[HoraReserva],[PrecoTotal],[Estado],[UtilizadorId],[EstafetaId]) ' +
            'VALUES (@Descricao,@Morada,@HoraReservada,@HoraReserva,@PrecoTotal,@Estado,@UtilizadorId,@EstafetaId) ' +
            'SELECT SCOPE_IDENTITY() AS Id';

        const insertPedido = await pool.request()
            .input('Descricao', sql.VarChar(255), pedidoData.Descricao)
            .input('Morada', sql.VarChar(255), pedidoData.Morada)
            .input('HoraReservada', sql.DateTime, pedidoData.HoraReservada)
            .input('HoraReserva', sql.DateTime, sqlCurrentDateString)
            .input('PrecoTotal', sql.Real, 0)
            .input('Estado', sql.VarChar(255), utils.estadosPedidos.EP_NaoPago)
            .input('UtilizadorId', sql.Int, pedidoData.UtilizadorId)
            .input('EstafetaId', sql.Int, Math.floor(Math.random() * 5) + 1)
            .query(query);

        return insertPedido.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updatePedidoPago = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET Estado=@Estado WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_Pago)
            .query(query);

        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateTerminarPrazoPedido = async (Id) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET Estado=@Estado WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('Estado', sql.VarChar(255), utils.estadosPagamentos.EP_TerminouPrazo)
            .query(query);

        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateHoraEntregaPedido = async (Id) => {
    try {
        const currentDate = new Date();
        const sqlCurrentDateString = currentDate.toISOString().slice(0, 19).replace('T', ' ');

        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET [HoraEntrega] = @HoraEntrega ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('HoraEntrega', sql.DateTime, sqlCurrentDateString)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

const updatePrecoTotalPedido = async (Id, PrecoTotal) => {
    try {
        let pool = await sql.connect(config.sql);
        let query = 'UPDATE [dbo].[Pedido] SET [PrecoTotal] = @PrecoTotal ' +
            'WHERE [Id]=@Id';

        const update = await pool.request()
            .input('Id', sql.Int, Id)
            .input('PrecoTotal', sql.Real, PrecoTotal)
            .query(query);

        return update.recordset;
    }
    catch (error) {
        return error.message;
    }
}

module.exports = {
    listPedidos,
    listPedidoById,
    listPedidosByUserId,
    listPedidoPagamentoById,
    listPedidoPagamentoByUserId,
    createPedido,
    updatePedidoPago,
    updateTerminarPrazoPedido,
    updateHoraEntregaPedido,
    updatePrecoTotalPedido
}