import { Usuario } from './../interfaces/usuario';
import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Service()
export class GestionarUsuarios {
  private serviceUrl = '/json/usuarios.json';
  private http = inject(HttpClient);

  getUsuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get<Usuario[]>(this.serviceUrl, { headers });
  }
}
