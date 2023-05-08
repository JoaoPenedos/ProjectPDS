/*
Ao fazer login verifica o tier do utilizador, caso este seja "premium",
verifica 'Descricao' se já existe pagamento referente ao mes atual
    Caso de não existir verifica se a data atual está entre os 8 primeiros dias do mes
        caso se confirme os dias é criado um pagamento para ser pago até ao dia 8
        caso de já ter passado os 8 dias retira a role "premium" e passa a user "normal"
    Caso de existir verifica se a data atual já passou dia 8 do mes
        caso de já ter passado os 8 dias retira a role "premium" e passa a user "normal"
Caso não tenha chegado ao proximo mes não faz nada
 */

'use strict'
const pagamentoData = require("../data/pagamentoService");
const utilizadorData = require("../data/utilizadorService");
const utils = require('../utils/utils');

const pagamentoPremiumVerify  = async (req, res, next) => {
    try{
        const userId = req.body;
        const user = await utilizadorData.listUtilizadorById(userId.UtilizadorId)
        const topPagP = await pagamentoData.listTopPagamentoPremium(userId.UtilizadorId);
        if (topPagP.length !== 0) {
            const dateValue = topPagP[0].DataEmissao;
            const monthValue = dateValue.getMonth() + 1;
            const currentMonth = new Date().getMonth() + 1;
            const currentDayMonth = new Date().getDate();

            if (user[0].Utilizador_Roles == utils.user_roles.UR_Premium) {
                if (monthValue === currentMonth) {
                    if(currentDayMonth > 8 && topPagP[0].Estado == utils.estadosPagamentos.EP_NaoPago) {
                        await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
                        await utilizadorData.updateRolesUtilizador(userId.UtilizadorId,utils.user_roles.UR_Normal);
                    }
                }
                else if (monthValue < currentMonth) {
                    if(currentDayMonth <= 8) {
                        await pagamentoData.createPagamentoPremium(userId.UtilizadorId);
                    }
                    else if(currentDayMonth > 8) {
                        await pagamentoData.createPagamentoPremium(userId.UtilizadorId);
                        await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
                        await utilizadorData.updateRolesUtilizador(userId,utils.user_roles.UR_Normal);
                    }
                }
            }
            else if (monthValue < currentMonth) {
                await pagamentoData.updateTerminarPrazoPagamento(topPagP[0].Id);
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
    pagamentoPremiumVerify
}