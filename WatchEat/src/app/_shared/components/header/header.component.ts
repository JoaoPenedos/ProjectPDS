import {Component, OnInit, Input, HostListener, ElementRef} from '@angular/core';
import { AuthService } from "../../services/_Auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host: {
    "(window:click)": "onClick()"
  }
})
export class HeaderComponent {
  isOpen = false;
  isOpenMobile = false;
  isUserLogged = false;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.IsUserLogged();
  }

  IsUserLogged(): void {
    this.isUserLogged = this.authService.IsUserLogged();
  }
  LogoutUser(): void {
    this.authService.LogoutUser();
  }

  toggleMenu(event : any) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
  toggleMenuMobile() {
    this.isOpenMobile = !this.isOpenMobile;
  }
  closeMenu() {
    this.isOpen = false;
  }
  onClick() {
    this.isOpen = false;
  }
}
