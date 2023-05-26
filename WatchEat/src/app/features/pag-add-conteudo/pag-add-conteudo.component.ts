import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pag-add-conteudo',
  templateUrl: './pag-add-conteudo.component.html',
  styleUrls: ['./pag-add-conteudo.component.css']
})
export class PagAddConteudoComponent implements OnInit {
  conteudoForm!: FormGroup;
  submitted = false;

  tipoconteudo!: string;
  duracao!: number;
  conteudoid!: number;
  ntemporadas!: number;
  nepisodios!: number;
  estado!: string;
  datafim!: Date;
  conteudoidserie!: number;
  titulo!: string;
  direcao!: string;
  rating!: number;
  sinopse!: string;
  trailer!: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.conteudoForm = this.formBuilder.group({
      tipoconteudo: ['', Validators.required],
      duracao: ['', Validators.required],
      conteudoid: ['', Validators.required],
      ntemporadas: ['', Validators.required],
      nepisodios: ['', Validators.required],
      estado: ['', Validators.required],
      datafim: ['', Validators.required],
      conteudoidserie: ['', Validators.required],
      titulo: ['', Validators.required],
      direcao: ['', Validators.required],
      rating: ['', Validators.required],
      sinopse: ['', Validators.required],
      trailer: ['', Validators.required]
    });
  }

  get f() { return this.conteudoForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.conteudoForm.invalid) {
      return;
    }

    // Handle form submission logic here
  }
}
