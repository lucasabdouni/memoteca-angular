import { Component, Input, OnInit } from '@angular/core';
import { PensamentoProps } from 'src/app/models/interface/pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css'],
})
export class PensamentoComponent implements OnInit {
  @Input() pensamento!: PensamentoProps;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {}

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g';
    }
    return 'pensamento-p';
  }

  mudarIconeFavorito(): string {
    if (this.pensamento.favorito === false) {
      return 'inativo';
    } else {
      return 'ativo';
    }
  }

  atualizarFavoritos() {
    this.service.mudarFavorito(this.pensamento).subscribe();
  }
}
