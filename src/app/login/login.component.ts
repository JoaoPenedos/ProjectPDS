import { Component } from '@angular/core';
import { Output, EventEmitter } from "@angular/core";
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ) {}

  LogUser(): void {
    this.authService.LogUser();
  }
}


