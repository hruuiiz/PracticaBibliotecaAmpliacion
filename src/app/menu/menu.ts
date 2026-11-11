import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';

@Component({
  selector: 'app-menu',
  styleUrl: './menu.css',
  templateUrl: './menu.html',
})
export class Menu {
  private router = inject(Router);
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  correo = this.gestionarComunicaciones.correo;
  rol = this.gestionarComunicaciones.rol;
  cantidadCarrito = this.gestionarComunicaciones.cantidadCarrito;


  irAlDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  irAlCatalogo() {
    this.router.navigate(["/catalogo"]);
  }

  irAlCarrito() {
    this.router.navigate(["/carrito"]);
  }

  irATablaPrestamos() {
    this.router.navigate(["/prestamos"]);
  }

  cerrarSesion() {
    this.gestionarComunicaciones.cerrarSesion();
    this.router.navigate(["/login"]);
  }
}
