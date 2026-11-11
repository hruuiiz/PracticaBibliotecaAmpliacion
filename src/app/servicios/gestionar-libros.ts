import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Service()
export class GestionarLibros {
  private serviceUrl = '/json/libros.json';
  private http = inject(HttpClient);

  getLibros(): Observable<Libro[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<Libro[]>(this.serviceUrl, { headers });
  }
}
