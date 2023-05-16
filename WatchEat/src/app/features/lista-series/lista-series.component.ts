import { Component } from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-lista-series',
  templateUrl: './lista-series.component.html',
  styleUrls: ['./lista-series.component.css']
})
export class ListaSeriesComponent {
  conteudosSeries: any[] = [];

  constructor(private conteudoDataService: ConteudosDataService) {}

  ngOnInit() {
    this.conteudoDataService.getConteudosSeries().subscribe((data: Object) => {
      this.conteudosSeries = data as any[]; // Cast the data to an array type
    });
  }
}
