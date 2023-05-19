import { Component, OnInit, Input } from '@angular/core';
import { Router} from "@angular/router";
import {AuthService} from "./_shared/services/_Auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'WatchEat';
  currentUser = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}


  // ngOnInit() {
  //   this.authService.LogUser();
  // }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
