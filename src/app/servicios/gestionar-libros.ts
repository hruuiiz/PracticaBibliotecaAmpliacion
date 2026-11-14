import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Libro } from '../interfaces/libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Service()
export class GestionarLibros {
  private apiRestUrl = 'http://localhost:3000/libros';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private http = inject(HttpClient);

  getLibros(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiRestUrl)
      .pipe(catchError(this.handleError<Libro[]>('getLibros', [])));
  }

  getLibro(id: string): Observable<Libro> {
  return this.http.get<Libro>(this.apiRestUrl + '/' + id).pipe(
    catchError(this.handleError<Libro>('getLibro'))
  );
  }

  addLibro(libro: Libro): Observable<Libro> {
  return this.http.post<Libro>(this.apiRestUrl, libro, this.httpOptions).pipe(
    catchError(this.handleError<Libro>('addLibro'))
  );
  }

  actualizarLibro(id: string, libro: Libro): Observable<Libro> {
  return this.http.put<Libro>(this.apiRestUrl + '/' + id, libro, this.httpOptions).pipe(
    catchError(this.handleError<Libro>('actualizarLibro'))
  );
  }

  deleteLibro(id: string): Observable<any> {
  return this.http.delete<any>(this.apiRestUrl + '/' + id, this.httpOptions).pipe(
    catchError(this.handleError<any>('deleteLibro'))
  );
}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

