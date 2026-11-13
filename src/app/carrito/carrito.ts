import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { GestionarLibros } from '../servicios/gestionar-libros';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';


@Component({
  imports: [],
  selector: 'app-carrito',
  styleUrl: './carrito.css',
  templateUrl: './carrito.html',
})

export class Carrito {
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  correo = this.gestionarComunicaciones.correo;
  rol = this.gestionarComunicaciones.rol;
  cantidadCarrito = this.gestionarComunicaciones.cantidadCarrito;

  carrito = this.gestionarComunicaciones.carrito;

  eliminarLibro(libro: Libro) {
  this.gestionarComunicaciones.eliminarDelCarrito(libro._id);
}


}
