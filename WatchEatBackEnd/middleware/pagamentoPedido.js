// /*
// verifica se a data de efetuar o pagamento atual é superior a 1hora
//     caso sim permite o pagamento do mesmo
//     no contrario cancela o pedido automaticamento e muda o estado do pedido
//  */

'use strict'
const pagamentoData = require("../data/pagamentoService");
const utilizadorData = require("../data/utilizadorService");
const pedidoData = require("../data/pedidoService");
const utils = require('../utils/utils');

const pagamentoPedidosVerify  = async (req, res, next) => {
    try{
        const userId = req.body;
        const user = await utilizadorData.listUtilizadorById(userId.UtilizadorId);
        const userPedidosPagaments = await pedidoData.listPedidoPagamentoByUserId(userId.UtilizadorId)

        if (userPedidosPagaments.length !== 0) {
            const currentDate = new Date();

            for (const item of userPedidosPagaments) {
                const diffInMilliseconds = new Date(item.HoraReservada) - currentDate;
                const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

                if (diffInHours < 1) {
                    await pagamentoData.updateTerminarPrazoPagamento(item.PagamentoId);
                    await pedidoData.updateTerminarPrazoPedido(item.Id);
                }
            }
        }
        else {
            return next();
        }

        return next();
    }
    catch (error){
        return res.status(400).send(error.message);
    }
}

module.exports = {
    pagamentoPedidosVerify
}