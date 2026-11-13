import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Service()
export class GestionarUsuarios {
  private apiRestUrl = 'http://localhost:3000/usuarios';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private http = inject(HttpClient);

  login(correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiRestUrl + '/login', { correo, contrasena }, this.httpOptions)
      .pipe(catchError(this.handleError<Usuario>('login')));
  }

  registro(correo: string, contrasena: string): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiRestUrl + '/registro', { correo, contrasena }, this.httpOptions)
      .pipe(catchError(this.handleError<Usuario>('registro')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}