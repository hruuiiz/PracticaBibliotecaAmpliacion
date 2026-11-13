import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prestamo } from '../interfaces/prestamo';
import { HttpClient } from '@angular/common/http';

@Service()
export class GestionarPrestamos {
  private apiRestUrl = 'http://localhost:3000/prestamos';
  private http = inject(HttpClient);

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiRestUrl)
      .pipe(catchError(this.handleError<Prestamo[]>('getPrestamos', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}