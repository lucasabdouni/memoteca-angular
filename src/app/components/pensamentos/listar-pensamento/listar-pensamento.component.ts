import { Component, OnInit } from '@angular/core';
import { PensamentoProps } from 'src/app/models/interface/pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: PensamentoProps[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro!: string;
  favoritos: boolean = false;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, undefined, this.favoritos)
      .subscribe((response) => {
        this.listaPensamentos.push(...response);
        if (!response.length) {
          this.haMaisPensamentos = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service
      .listar(this.paginaAtual, this.filtro)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  listarFavorito() {
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentosFavoritos) => {
        this.listaPensamentos = listaPensamentosFavoritos;
      });
  }
}
