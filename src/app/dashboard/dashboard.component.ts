import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { GestionarLibros } from '../servicios/gestionar-libros';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterLink],

})
export class DashboardComponent implements OnInit {
  libros = signal<Libro[]>([]);

  private gestionarLibros = inject(GestionarLibros);

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.gestionarLibros.getLibros().subscribe((libros) => {
      this.libros.set(libros.slice(libros.length - 5, libros.length));
    });
  }
}
