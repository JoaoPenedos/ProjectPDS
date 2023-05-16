import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogged = false;


  constructor(private http: HttpClient) { }

  authLogin(email: string, password: string) {
    const url = 'http://localhost:3000/api/authLogin';
    const body = {
      Email: email,
      Password: password
    };

    return this.http.post(url, body, {observe: 'response'});
  }

  authRegister(email: string, password: string, confirm_password: string) {
    const url = 'http://localhost:3000/api/authRegister';
    const body = {
      Email: email,
      Password: password,
      confirm_password: confirm_password
    };

    return this.http.post(url, body, {observe: 'response'});
  }


  IsUserLogged() {
    return this.isUserLogged;
  }
  LogUser() {
    this.isUserLogged = !this.isUserLogged;
  }
}
