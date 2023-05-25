import { Component } from '@angular/core';
import {PagamentosDataService} from "../../_shared/services/Pagamentos/pagamentos-data.service";
import decode from "jwt-decode";

@Component({
  selector: 'app-pagina-pagamentos',
  templateUrl: './pag-pagamentos.component.html',
  styleUrls: ['./pag-pagamentos.component.css']
})
export class PagPagamentosComponent {
  pagamentos: any[] = [];

  constructor(private pagamentosDataService: PagamentosDataService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.pagamentosDataService.getUserPagamentos(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.pagamentos = data as any[]; // Cast the data to an array type
    });
  }

}
