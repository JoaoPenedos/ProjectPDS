import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-biblioteca',
  templateUrl: './pag-biblioteca.component.html',
  styleUrls: ['./pag-biblioteca.component.css']
})
export class PagBibliotecaComponent {
  conteudos: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudos().subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }
}
