import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { GestionarLibros } from '../servicios/gestionar-libros';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';
import { FiltroLibros } from '../filtro-libros/filtro-libros';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
  imports: [RouterLink, FiltroLibros],

})

export class Catalogo implements OnInit {

  private gestionarComunicaciones = inject(GestionarComunicaciones);
  correo = this.gestionarComunicaciones.correo;
  rol = this.gestionarComunicaciones.rol;
  cantidadCarrito = this.gestionarComunicaciones.cantidadCarrito;
  generoElegido = this.gestionarComunicaciones.generoElegido;
  ordenElegido = this.gestionarComunicaciones.ordenElegido;

  librosFiltrados = computed(() => {
    const genero = this.generoElegido();
    const orden = this.ordenElegido();

    let lista = this.libros().slice(0, this.libros().length);

    if (genero !== 'Todos') {
      lista = lista.filter(libro => libro.genero === genero);
    }

    if (orden === 'Título A-Z') {
      lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    if (orden === 'Título Z-A') {
      lista.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }
    if (orden === 'Más antiguos') {
      lista.sort((a, b) => a.anio - b.anio);
    }
    if (orden === 'Más recientes') {
      lista.sort((a, b) => b.anio - a.anio);
    }

    return lista;
  });

  private gestionarLibros = inject(GestionarLibros);
  libros = signal<Libro[]>([]);
  ngOnInit() {
    this.getLibros();
  }

  getLibros() {
    this.gestionarLibros.getLibros().subscribe(libros => {
      this.libros.set(libros);
    })
  }

  alquilarLibro(libro: Libro) {
    this.gestionarComunicaciones.agregarAlCarrito(libro);
  }
}