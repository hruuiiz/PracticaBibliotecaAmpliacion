import { Component, inject } from '@angular/core';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones'; 


@Component({
  imports: [],
  selector: 'app-filtro-libros',
  styleUrl: './filtro-libros.css',
  templateUrl: './filtro-libros.html',
})

export class FiltroLibros {
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  generoElegido = this.gestionarComunicaciones.generoElegido;
  generos = ['Todos', 'Ciencia ficción', 'Clásico', 'Fantasía', 'Historia', 'Misterio', 'Novela', 'Terror'];
  ordenElegido = this.gestionarComunicaciones.ordenElegido;
  ordenes = ['Sin orden', 'Título A-Z', 'Título Z-A', 'Más antiguos', 'Más recientes'];


  elegirGenero(genero: string) {
    this.gestionarComunicaciones.elegirGenero(genero);
  }

  elegirOrden(orden: string) {
    this.gestionarComunicaciones.elegirOrden(orden);
  }
}
