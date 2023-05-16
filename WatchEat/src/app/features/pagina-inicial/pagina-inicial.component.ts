import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent {
  conteudos: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudos().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }
}
