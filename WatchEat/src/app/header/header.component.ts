import { Component, OnInit, Input } from '@angular/core';
import { AuthService} from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isUserLogged = false;
  isOpen = false;
  isOpenMobile = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.IsUserLogged();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
  toggleMenuMobile() {
    this.isOpenMobile = !this.isOpenMobile;
  }
  IsUserLogged(): void {
    this.isUserLogged = this.authService.IsUserLogged();
  }

  LogUser(): void {
    this.authService.LogUser();
    this.IsUserLogged();
  }

}
