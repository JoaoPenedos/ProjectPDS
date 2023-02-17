# ProjectPDS - ...
***

## Ideias para o projeto:
* Knock Off do IMDB (Graças ao acesso à API do imdb conseguimos bastantes informações)
  * Amigos, listagem, pedidos listas dos amigos;
  * Filmes/series vistos, para ver, deixados;
  * Reviews, pontuações, rankings;
  * Listagens, aplicação de filtros (gêneros, atores, diretores, duração, etc...);
  * Developer tools:
	* CRUD para filmes/series;
  * Tecnologias
    * Node.js;
    * Espress.js;
    * Angular ou React;
    * MySQL ou SQLServer ou MongoDB.
    * (MEAN ou MERN se seguirmos com mongoDB(ainda será necessário apurar benefícios))
  * Ideias:
  * Regras de negocio:
    * Plano de tier de utilizadores
      * tier normal free - acesso normal a plataforma ( especificar depois)
      * tier editor pago - acesso normal mais permissão de edição de filmes
      * a edição tem que ser aceite por um moderador, se a edição for recusada terá que refazer e reenviar, no caso de ser negada 3 vezes é suspenso durante x tempo e sujeito a uma avaliação interna
      * se for recusado durante a avaliação passa novamente a ser apenas utilizador normal sem poder voltar a ser editor
      * A qualquer momento pode mudar de plano a não ser que esteja (suspenso, proibido)
    * Definição de um calendário de horas de visualização
      * ao definir uma hora futura para ver um filme, é dada a opção de pedir comida para essa dada hora
      * terá integração com um sitema exterior onde pode fazer a encomenda para a determinada hora reservada
      * No caso da comida escolhida não estar disponivel (horas, ingredientes, fistrubuidora fechada, etc), irá ser oferecida outras opções, onde é reiniciada o pedido.
      * estes pedidos iram ficar ligado a um estafeta, que poderá ser vizualizado no sistema
      * Será possivel cancelar o pedido até 1 hora antes da hora reserva.
    * ..
    * ..
    * ..
    * Ligação com api do twitter
