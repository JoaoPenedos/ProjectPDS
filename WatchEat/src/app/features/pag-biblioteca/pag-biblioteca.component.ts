import { Component } from '@angular/core';
import {BibliotecaDataService} from "../../_shared/services/Bibliotecas/biblioteca-data.service";
import decode from "jwt-decode";

@Component({
  selector: 'app-biblioteca',
  templateUrl: './pag-biblioteca.component.html',
  styleUrls: ['./pag-biblioteca.component.css']
})
export class PagBibliotecaComponent {
  conteudos: any[] = [];

  constructor(
    private bibliotecaDataService: BibliotecaDataService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.bibliotecaDataService.getBibliotecaById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.conteudos = data as any[]; // Cast the data to an array type
    });
  }
}
