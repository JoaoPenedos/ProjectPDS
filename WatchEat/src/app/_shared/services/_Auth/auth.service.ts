import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { tap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogged = false;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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
    // Get the token from local storage or any other source
    const token = localStorage.getItem('token');
    // Set the token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (!token){
      this.router.navigate(['/login']);
    }
    else {
      this.isUserLogged = !this.isUserLogged;
    }
  }

  LogoutUser() {
    // Get the token from local storage or any other source
    localStorage.removeItem('token');
    // Set the token in the request headers

    this.router.navigate(['/login']);
  }
}
