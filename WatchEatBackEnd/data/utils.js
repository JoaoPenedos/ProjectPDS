'use strict';
const estadosUtilizadores = {
    UserState1: 'Ativo',
    UserState2: 'Suspenso',
    UserState3: 'Bloqueado'
}

const estadosConteudosBiblioteca = {
    BiblioState1: 'Para Assistir',
    BiblioState2: 'Terminado',
    BiblioState3: 'Assistindo',
    BiblioState4: 'Em Espera',
    BiblioState5: 'Cancelado',
}

const estadosPagamentos = {
    PagamentoState1: 'Pago',
    PagamentoState2: 'Não Pago',
    PagamentoState3: 'Terminou o Prazo'
}

const estadosPedidos = {
    PedidosState1: 'Em Aberto',
    PedidosState2: 'Cancelado',
    PedidosState3: 'Cancelado Depois de Pagamento',
    PedidosState4: 'Pago',
    PedidosState5: 'Não Pago',
    PedidosState6: 'Em Preparação',
    PedidosState7: 'Expedido',
    PedidosState8: 'Entregue',
    PedidosState9: 'Utilizador Não Apareceu',
    PedidosState10: 'Sitio Não Encontrado'
}

const estadosAmizade = {
    AmizadeState1: 'Amigos',
    AmizadeState2: 'Pedido Enviado'
}

const estadosSerie = {
    SerieState1: 'A decorrer',
    SerieState2: 'Concluido',
    SerieState3: 'Brevemente'
}

module.exports = {
    estadosUtilizadores,
    estadosConteudosBiblioteca,
    estadosPagamentos,
    estadosPedidos,
    estadosAmizade,
    estadosSerie
}