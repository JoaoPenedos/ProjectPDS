import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import decode from "jwt-decode";
import {ConteudosDataService} from "../../_shared/services/Conteudos/conteudos-data.service";

@Component({
  selector: 'app-pag-add-conteudo',
  templateUrl: './pag-add-conteudo.component.html',
  styleUrls: ['./pag-add-conteudo.component.css']
})
export class PagAddConteudoComponent implements OnInit {
  submitted = false;
  newConteudoForm = this.formBuilder.group({
    TipoConteudo: '',
    Duracao: '',
    NTemporadas: '',
    NTEpisodios: '',
    Estado: '',
    DataFim: '',
    Titulo: '',
    Direcao: '',
    Rating: '',
    Sinopse: '',
    DataReleased: '',
    Trailer: '',
    Poster: ''
  });

  constructor(
    private conteudosDataService: ConteudosDataService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.newConteudoForm = this.formBuilder.group({
      TipoConteudo: ['filmes', Validators.required],
      Duracao: ['', Validators.required],
      NTemporadas: ['', Validators.required],
      NTEpisodios: ['', Validators.required],
      Estado: ['', Validators.required],
      DataFim: ['', Validators.required],
      Titulo: ['', Validators.required],
      Direcao: ['', Validators.required],
      Rating: ['', Validators.required],
      Sinopse: ['', Validators.required],
      DataReleased: ['', Validators.required],
      Trailer: ['', Validators.required],
      Poster: ['', Validators.required]
    });
  }

  isFilmesSelected(): boolean {
    return this.newConteudoForm.get('TipoConteudo')?.value === 'filmes';
  }

  isSeriesSelected(): boolean {
    return this.newConteudoForm.get('TipoConteudo')?.value === 'series';
  }

  onSubmit() {
    const token = localStorage.getItem('token');
    const tokenPayload = decode(token as string) as any;
    this.submitted = true;

    if (this.newConteudoForm.invalid) {
      return;
    }

    // this.conteudosDataService.(tokenPayload.user[0].Id, this.updateUtilizadorForm).subscribe((data: Object) => {
    //   this.user = data as any[]; // Cast the data to an array type
    // });
  }
}
