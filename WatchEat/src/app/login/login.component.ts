import { Component } from '@angular/core';
import { Output, EventEmitter } from "@angular/core";
import { AuthService} from "../auth.service";
import {LoginService} from "./login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  users: any;

  constructor(
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  LogUser(): void {
    this.authService.LogUser();
  }

  ngOnInit() {
    this.loginService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }

}


