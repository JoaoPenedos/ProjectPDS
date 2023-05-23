import {Component} from '@angular/core';
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-pagina-conteudo',
  templateUrl: './pag-conteudo.component.html',
  styleUrls: ['./pag-conteudo.component.css']
})
export class PagConteudoComponent {
  conteudo: any[] = [];
  urlLoaded = false;

  constructor(
    private conteudosDataService: ConteudosDataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);

    const currentUrl = this.router.url;
    this.conteudosDataService.getConteudoById(currentUrl).subscribe((data: Object) => {
      this.conteudo = data as any[]; // Cast the data to an array type
    });
  }

  getTrustedUrl(url: string): SafeResourceUrl {
    if(!this.urlLoaded){
      this.urlLoaded = true;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return url;
  }
}
