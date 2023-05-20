import { Component } from '@angular/core';
import decode from "jwt-decode";
import {UtilizadoresDataService} from "../../_shared/services/Utilizadores/utilizadores-data.service";

@Component({
  selector: 'app-pag-edit-perfil',
  templateUrl: './pag-edit-perfil.component.html',
  styleUrls: ['./pag-edit-perfil.component.css']
})
export class PagEditPerfilComponent {
  user: any[] = [];

  constructor(
    private utilizadoresDataService: UtilizadoresDataService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.utilizadoresDataService.getUtilizadorById(tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.user = data as any[]; // Cast the data to an array type
    });
  }
}
