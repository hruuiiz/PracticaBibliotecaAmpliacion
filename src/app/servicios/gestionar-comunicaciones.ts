import { Service, signal, computed } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { Libro } from '../interfaces/libro';

@Service()
export class GestionarComunicaciones {
  correo = signal<string>('');
  rol = signal<string>('');
  idUsuario = signal<string>('');
  carrito = signal<Libro[]>([]);
  cantidadCarrito = computed(() => this.carrito().length);
  generoElegido = signal<string>('Todos');
  ordenElegido = signal<string>('Sin orden');
  estadoPrestamoElegido = signal<string>('Todos');
  ordenPrestamoElegido = signal<string>('Sin orden');

  elegirGenero(genero: string) {
    this.generoElegido.set(genero); 
  }

  elegirOrden(orden: string) {
    this.ordenElegido.set(orden);
  }

  elegirEstadoPrestamo(estado: string) {
    this.estadoPrestamoElegido.set(estado);
  }

  elegirOrdenPrestamo(orden: string) {
    this.ordenPrestamoElegido.set(orden);
  }

  iniciarSesion(usuario: Usuario) {
    this.correo.set(usuario.correo);
    this.rol.set(usuario.rol);
    this.idUsuario.set(usuario._id);
  }

  cerrarSesion() {
    this.correo.set('');
    this.rol.set('');
    this.idUsuario.set('');
    this.carrito.set([]);
  }

  agregarAlCarrito(libro: Libro) {
    if (!this.carrito().find(item => item._id === libro._id)) {
      this.carrito.update(librosActuales => [...librosActuales, libro]);
    }
  }

  eliminarDelCarrito(libroId: string) {
    this.carrito.update(librosActuales => librosActuales.filter(item => item._id !== libroId));
  }
}

