import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilizadoresDataService {

  constructor(private http: HttpClient) { }

  getUtilizadores() {
    const url = 'http://localhost:3000/api/Utilizadores';
    return this.http.get(url);
  }

  getUtilizadorById(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/Utilizador/' + Id;
    return this.http.get(url, { headers } );
  }

  getUtilizadorAmizade(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UtilizadorAmizade/' + Id;
    return this.http.get(url, { headers } );
  }

  getUtilizadorAmizadeTop6(Id : bigint) {
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UtilizadorAmizadeTop6/' + Id;
    return this.http.get(url, { headers } );
  }
}
