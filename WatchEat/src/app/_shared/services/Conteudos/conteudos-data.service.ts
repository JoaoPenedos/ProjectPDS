import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConteudosDataService {

  constructor(private http: HttpClient) { }

  getConteudos() {
    const url = 'http://localhost:3000/api/Conteudos';
    return this.http.get(url);
  }

  getConteudoById(currentUrl : string) {
    const Id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const url = 'http://localhost:3000/api/Conteudo/' + Id;
    return this.http.get(url);
  }

  getConteudosFilmes() {
    const url = 'http://localhost:3000/api/Conteudos/Filmes';
    return this.http.get(url);
  }

  getConteudosSeries() {
    const url = 'http://localhost:3000/api/Conteudos/Series';
    return this.http.get(url);
  }
}
