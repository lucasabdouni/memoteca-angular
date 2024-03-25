import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PensamentoProps } from 'models/interface/pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {
  private readonly API = 'http://localhost:3000/pensamentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<PensamentoProps[]> {
    return this.http.get<PensamentoProps[]>(this.API);
  }

  criar(pensamento: PensamentoProps): Observable<PensamentoProps> {
    return this.http.post<PensamentoProps>(this.API, pensamento);
  }

  editar(pensamento: PensamentoProps): Observable<PensamentoProps> {
    const url = `${this.API}/${pensamento.id}`;
    return this.http.put<PensamentoProps>(url, pensamento);
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
