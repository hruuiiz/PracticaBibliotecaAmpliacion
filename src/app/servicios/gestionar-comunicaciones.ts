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
  generoElegido = signal<string>('Todos'); //Caja que solo admite strings y que empieza en todos
  ordenElegido = signal<string>('Sin orden');

  elegirGenero(genero: string) { //Método para cambiar lo que hay apuntado y que recibe el género que le dan
    this.generoElegido.set(genero); //Cambia el género que ya está por el género recibido
  }

  elegirOrden(orden: string) {
  this.ordenElegido.set(orden);
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
    if (!this.carrito().find(item => item._id === libro._id)) {   // find en lugar de some
      this.carrito.update(librosActuales => [...librosActuales, libro]);
    }
  }

  eliminarDelCarrito(libroId: string) {
    this.carrito.update(librosActuales => librosActuales.filter(item => item._id !== libroId));
  }
}

