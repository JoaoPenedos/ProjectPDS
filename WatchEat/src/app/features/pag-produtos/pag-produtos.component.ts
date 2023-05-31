import { Component } from '@angular/core';
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";
import {ProdutosDataService} from "../../_shared/services/Produtos/produtos-data.service";
import decode from "jwt-decode";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-pagina-produtos',
  templateUrl: './pag-produtos.component.html',
  styleUrls: ['./pag-produtos.component.css']
})
export class PagProdutosComponent {
  produtos: any[] = [];

  constructor(
    private produtosDataService: ProdutosDataService
  ) {}

  ngOnInit() {
    this.produtosDataService.getProdutos().subscribe((data: Object) => {
      this.produtos = data as any[];
    });
  }
  adicionarProduto(prodId: string): void {
    const produtosQuantidades: { [key: string]: number } = {};
    // Verifica se o produto já existe na variável local
    if (prodId in produtosQuantidades) {
      // Se o produto já existir, incrementa a quantidade em 1
      produtosQuantidades[prodId]++;
    } else {
      // Se o produto não existir, adiciona com quantidade 1
      produtosQuantidades[prodId] = 1;
    }
    const quantidadeTotal = Object.values(produtosQuantidades).reduce((acc, curr) => acc + curr, 0);
    const quantidadeElement = document.getElementById("quantidade-produtos");
    if (quantidadeElement) {
      quantidadeElement.textContent = quantidadeTotal.toString();
    }
    // Exibe a quantidade no console (apenas para demonstração)
    console.log(produtosQuantidades[prodId]);
  }

}

// Função para guardar a quantidade de produtos


