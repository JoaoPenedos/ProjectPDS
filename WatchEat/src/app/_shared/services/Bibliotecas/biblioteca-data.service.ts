import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BibliotecaDataService {

  constructor(private http: HttpClient) { }

  getBibliotecas() {
    const url = 'http://localhost:3000/api/Bibliotecas';
    return this.http.get(url);
  }

  getBibliotecaById(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Biblioteca/' + Id;
    return this.http.get(url, { headers } );
  }

  getBibliotecaFilmesTop6ById(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/BibliotecaFilmesTop6/' + Id;
    return this.http.get(url, { headers } );
  }

  getBibliotecaSeriesTop6ById(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = 'http://localhost:3000/api/BibliotecaSeriesTop6/' + Id;
    return this.http.get(url, { headers } );
  }
}
