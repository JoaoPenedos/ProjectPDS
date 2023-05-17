import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pag-inicial.component.html',
  styleUrls: ['./pag-inicial.component.css']
})
export class PagInicialComponent {
  conteudos: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudos().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }
}
