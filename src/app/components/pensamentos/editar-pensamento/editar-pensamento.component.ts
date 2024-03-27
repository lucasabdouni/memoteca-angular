import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoProps } from 'src/app/models/interface/pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  pensamento!: PensamentoProps;
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuider: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(id!).subscribe((pensamento) => {
      this.pensamento = pensamento;

      this.formulario = this.formBuider.group({
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        modelo: [pensamento.modelo],
        favorito: [this.pensamento.favorito],
      });
    });
  }

  editarPensamento() {
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
