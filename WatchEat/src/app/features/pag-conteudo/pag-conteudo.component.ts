import {Component} from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import decode from "jwt-decode";
import {BibliotecaDataService} from "../../_shared/services/Bibliotecas/biblioteca-data.service";

@Component({
  selector: 'app-pagina-conteudo',
  templateUrl: './pag-conteudo.component.html',
  styleUrls: ['./pag-conteudo.component.css']
})
export class PagConteudoComponent {
  conteudo: any[] = [];
  checkConteudo: any[] = [];
  urlLoaded = false;
  isButtonLoading: boolean = false;

  constructor(
    private conteudosDataService: ConteudosDataService,
    private bibliotecaDataService: BibliotecaDataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;

    this.conteudosDataService.getConteudoById(currentUrl).subscribe((data: Object) => {
      this.conteudo = data as any[]; // Cast the data to an array type
    });

    this.bibliotecaDataService.checkConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
      this.checkConteudo = data as any[]; // Cast the data to an array type
    });
  }

  getTrustedUrl(url: string): SafeResourceUrl {
    if(!this.urlLoaded){
      this.urlLoaded = true;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return url;
  }

  AddWatchList() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    const currentUrl = this.router.url;

    this.isButtonLoading = true; // Set the loading state to true

    this.bibliotecaDataService.addConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe(() => {
      this.bibliotecaDataService.checkConteudoInBiblioteca(currentUrl, tokenPayload.user[0].Id).subscribe((data: Object) => {
        this.checkConteudo = data as any[]; // Cast the data to an array type

        this.isButtonLoading = false; // Set the loading state back to false after receiving the response
      });
    });
  }
}
