# WatchEat

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
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
      * A qualquer momento pode mudar de plano, a não ser que esteja (suspenso, proibido)
    * Definição de um calendário de horas de visualização
      * ao definir uma hora futura para ver um filme, é dada a opção de pedir comida para essa dada hora
      * terá integração com um sitema exterior onde pode fazer a encomenda para a determinada hora reservada
      * No caso da comida escolhida não estar disponivel (horas, ingredientes, fistrubuidora fechada, etc), irá ser oferecida outras opções, onde é reiniciada o pedido.
      * estes pedidos iram ficar ligado a um estafeta, que poderá ser vizualizado no sistema
      * Será possivel cancelar o pedido até 1 hora antes da hora reserva.
    * Estatisticas dos filmes (dashboard)
    * ..
    * ..
