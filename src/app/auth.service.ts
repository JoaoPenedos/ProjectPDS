import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLogged = false;

  constructor() { }
  IsUserLogged() {
    return this.isUserLogged;
  }
  LogUser() {
    this.isUserLogged = !this.isUserLogged;
  }
}
