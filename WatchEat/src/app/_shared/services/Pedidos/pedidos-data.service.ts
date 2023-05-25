import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PedidosDataService {

  constructor(private http: HttpClient) { }

  getUserPedidos(userId : string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = 'http://localhost:3000/api/UserPedidos/' + userId;
    return this.http.get(url, { headers } );
  }
}
