import { Component, OnInit, Input } from '@angular/core';
import { Router} from "@angular/router";


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
  ) {}

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
