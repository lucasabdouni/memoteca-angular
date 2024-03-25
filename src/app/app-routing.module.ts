import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { EditarPensamentoComponent } from './components/pensamentos/editar-pensamento/editar-pensamento.component';
import { ExcluirPensamentoComponent } from './components/pensamentos/excluir-pensamento/excluir-pensamento.component';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPensamentoComponent,
    pathMatch: 'full',
  },
  {
    path: 'criar',
    component: CriarPensamentoComponent,
  },
  {
    path: 'pensamentos/editar/:id',
    component: EditarPensamentoComponent,
  },
  {
    path: 'pensamentos/excluir/:id',
    component: ExcluirPensamentoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
