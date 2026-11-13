import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Libro } from '../interfaces/libro';
import { HttpClient } from '@angular/common/http';

@Service()
export class GestionarLibros {
  private apiRestUrl = 'http://localhost:3000/libros';
  private http = inject(HttpClient);

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiRestUrl)
      .pipe(catchError(this.handleError<Libro[]>('getLibros', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}