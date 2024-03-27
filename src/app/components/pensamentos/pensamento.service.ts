import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PensamentoProps } from 'src/app/models/interface/pensamento';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(
    pagina: number,
    filtro?: string,
    favoritos?: boolean
  ): Observable<PensamentoProps[]> {
    const itensPorPagina = 6;

    let params = new HttpParams()
      .set('_page', pagina)
      .set('_limit', itensPorPagina);

    // return this.http.get<PensamentoProps[]>(
    //   `${this.API}?_page=${pagina}&_limit=${itensPorPagina}`
    // );

    if (filtro && filtro.trim().length > 2) {
      params = params.set('q', filtro);
    }

    if (favoritos && favoritos === true) {
      params = params.set('favorito', true);
    }

    return this.http.get<PensamentoProps[]>(this.API, {
      params,
    });
  }

  criar(pensamento: PensamentoProps): Observable<PensamentoProps> {
    return this.http.post<PensamentoProps>(this.API, pensamento);
  }

  editar(pensamento: PensamentoProps): Observable<PensamentoProps> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<PensamentoProps>(url, pensamento);
  }

  mudarFavorito(pensamento: PensamentoProps): Observable<PensamentoProps> {
    pensamento.favorito = !pensamento.favorito;

    return this.editar(pensamento);
  }

  excluir(id: string): Observable<PensamentoProps> {
    const url = `${this.API}/${id}`;
    return this.http.delete<PensamentoProps>(url);
  }

  buscarPorId(id: string): Observable<PensamentoProps> {
    const url = `${this.API}/${id}`;
    return this.http.get<PensamentoProps>(url);
  }
}
