import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent {
  conteudosFilmes: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudosFilmes().subscribe((data: Object) => {
      this.conteudosFilmes = data as any[]; // Cast the data to an array type
    });
  }
}
