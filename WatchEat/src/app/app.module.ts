import { NgModule } from '@angular/core';
import { RouterModule, Routes} from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaFilmesComponent } from './lista-filmes/lista-filmes.component';
import { ListaSeriesComponent } from './lista-series/lista-series.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'pagina-inicial', pathMatch: 'full' },
      { path: 'pagina-inicial', component: PaginaInicialComponent },
      { path: 'lista-filmes', component: ListaFilmesComponent },
      { path: 'lista-series', component: ListaSeriesComponent },
      { path: 'biblioteca', component: BibliotecaComponent },
      { path: 'perfil/:UserId', component: PerfilComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ])
  ],
  declarations: [
    AppComponent,
    BibliotecaComponent,
    PerfilComponent,
    ListaFilmesComponent,
    ListaSeriesComponent,
    PaginaInicialComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  // constructor(
  //   @Optional() @Inject('body') private body: any
  // ) {
  //   console.log(`body`, body);
  // }
}
