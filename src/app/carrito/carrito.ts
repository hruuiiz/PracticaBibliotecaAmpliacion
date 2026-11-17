import { Component, inject } from '@angular/core';
import { Libro } from '../interfaces/libro';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';
import { RouterLink } from '@angular/router';


@Component({
  imports: [RouterLink],
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

  eliminarLibro(libro: Libro) { //Almacena los datos del modelo en la variable y le dice a la función sobre cual actuar
    this.gestionarComunicaciones.eliminarDelCarrito(libro._id);
  }


}
