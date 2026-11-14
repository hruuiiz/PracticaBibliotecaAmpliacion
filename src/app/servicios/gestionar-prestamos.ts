import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prestamo } from '../interfaces/prestamo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Service()
export class GestionarPrestamos {
  private apiRestUrl = 'http://localhost:3000/prestamos';
  private http = inject(HttpClient);
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiRestUrl)
      .pipe(catchError(this.handleError<Prestamo[]>('getPrestamos', [])));
  }

  addPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiRestUrl, prestamo, this.httpOptions)
      .pipe(catchError(this.handleError<Prestamo>('addPrestamo')));
  }

  actualizarPrestamo(id: string, prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(this.apiRestUrl + '/' + id, prestamo, this.httpOptions)
      .pipe(catchError(this.handleError<Prestamo>('actualizarPrestamo')));
  }

  deletePrestamo(id: string): Observable<any> {
    return this.http.delete<any>(this.apiRestUrl + '/' + id, this.httpOptions)
      .pipe(catchError(this.handleError<any>('deletePrestamo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}