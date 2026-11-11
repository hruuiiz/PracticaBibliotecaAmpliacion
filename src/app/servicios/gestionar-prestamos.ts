import { Prestamo } from './../interfaces/prestamo';
import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//Idea de código de gestionar-destacados de canaveral-eats

@Service()
export class GestionarPrestamos {
  private serviceUrl = '/json/prestamos.json';
  private http = inject(HttpClient);

  getPrestamos(): Observable<Prestamo[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<Prestamo[]>(this.serviceUrl, { headers });
  }
}
