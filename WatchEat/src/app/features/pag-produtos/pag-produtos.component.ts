import { Component } from '@angular/core';
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";
import {ProdutosDataService} from "../../_shared/services/Produtos/produtos-data.service";
import decode from "jwt-decode";

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
}
