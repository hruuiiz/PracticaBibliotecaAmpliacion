import { Component, inject } from '@angular/core';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';

@Component({
  imports: [],
  selector: 'app-filtro-prestamos',
  styleUrl: './filtro-prestamos.css',
  templateUrl: './filtro-prestamos.html',
})

export class FiltroPrestamos {
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  estadoElegido = this.gestionarComunicaciones.estadoPrestamoElegido;
  estados = ['Todos', 'En curso', 'Devueltos'];
  ordenElegido = this.gestionarComunicaciones.ordenPrestamoElegido;
  ordenes = ['Sin orden', 'Devolución más próxima', 'Devolución más lejana'];

  elegirEstado(estado: string) {
    this.gestionarComunicaciones.elegirEstadoPrestamo(estado);
  }

  elegirOrden(orden: string) {
    this.gestionarComunicaciones.elegirOrdenPrestamo(orden);
  }
}