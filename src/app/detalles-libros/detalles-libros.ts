import { Component , inject, signal , OnInit} from '@angular/core';
import { Libro } from '../interfaces/libro';
import { UpperCasePipe } from '@angular/common';
import { GestionarLibros } from '../servicios/gestionar-libros';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [UpperCasePipe],
  selector: 'app-detalles-libros',
  styleUrl: './detalles-libros.css',
  templateUrl: './detalles-libros.html',
})


export class DetallesLibros implements OnInit {
  libro = signal<Libro | undefined>(undefined);
  private route = inject (ActivatedRoute)
  private gestionarLibros = inject(GestionarLibros);
  private location = inject(Location);

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getLibros());
  }

  getLibros(): void {
    this.gestionarLibros.getLibros().subscribe((libros) => {
      const id = this.route.snapshot.paramMap.get('id');
      this.libro.set(libros.find(libro => libro._id === id));
    });
  }

  goBack(): void {
  this.location.back();
  }

}
