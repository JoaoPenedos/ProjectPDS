import {Component, ViewChild} from '@angular/core';
import { UtilizadoresDataService } from "../../_shared/services/Utilizadores/utilizadores-data.service";
import { BibliotecaDataService } from "../../_shared/services/Bibliotecas/biblioteca-data.service";
import decode from 'jwt-decode';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/_Auth/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './pag-perfil.component.html',
  styleUrls: ['./pag-perfil.component.css']
})
export class PagPerfilComponent {
  @ViewChild('staticModal') staticModal: any; // Reference to the modal element
  user: any[] = [];
  bibliotecaFilmes: any[] = [];
  bibliotecaSeries: any[] = [];
  userAmizades: any[] = [];

  constructor(
    private utilizadoresDataService: UtilizadoresDataService,
    private bibliotecaDataService: BibliotecaDataService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.utilizadoresDataService.getUtilizadorById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
    });
    this.bibliotecaDataService.getBibliotecaFilmesTop6ById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.bibliotecaFilmes = data as any[]; // Cast the data to an array type
    });
    this.bibliotecaDataService.getBibliotecaSeriesTop6ById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.bibliotecaSeries = data as any[]; // Cast the data to an array type
    });
    this.utilizadoresDataService.getUtilizadorAmizadeTop6(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.userAmizades = data as any[]; // Cast the data to an array type
    });
  }

  openModal() {
    this.staticModal.nativeElement.classList.remove('hidden');
    this.staticModal.nativeElement.classList.add('flex');
  }

  closeModal() {
    this.staticModal.nativeElement.classList.remove('flex');
    this.staticModal.nativeElement.classList.add('hidden');
  }

  deleteUtilizador() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;

    this.utilizadoresDataService.deleteUtilizador(tokenPayload.user[0].Id).subscribe();
    this.authService.LogoutUser();
  }
}
