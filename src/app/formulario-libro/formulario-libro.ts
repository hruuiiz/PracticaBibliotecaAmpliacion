import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Libro } from '../interfaces/libro';
import { GestionarLibros } from '../servicios/gestionar-libros';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-formulario-libro',
  styleUrl: './formulario-libro.css',
  templateUrl: './formulario-libro.html',
})
export class FormularioLibro implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gestionarLibros = inject(GestionarLibros);
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  rol = this.gestionarComunicaciones.rol;

  id = this.route.snapshot.paramMap.get('id');
  generos = ['Ciencia ficción', 'Clásico', 'Fantasía', 'Historia', 'Misterio', 'Novela', 'Terror'];
  libroForm = signal<FormGroup>(this.crearFormulario());


  ngOnInit() {
    if (this.rol() !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }
    if (this.id) {
      this.gestionarLibros.getLibro(this.id).subscribe((libro) => {
        if (libro) {
          this.libroForm.set(this.crearFormulario(libro));
        } else {
          this.router.navigate(['/catalogo']);
        }
      });
    }
  }

  crearFormulario(libro?: Libro): FormGroup {
    let disponible = true;
    if (libro) {
      disponible = libro.disponible;
    }
    return this.fb.group({
      titulo: [libro?.titulo || '', [Validators.required]],
      autor: [libro?.autor || '', [Validators.required]],
      genero: [libro?.genero || '', [Validators.required]],
      anio: [libro?.anio || '', [Validators.required, Validators.pattern('^[0-9]{1,4}$')]],
      sinopsis: [libro?.sinopsis || '', [Validators.required]],
      imagen: [libro?.imagen || '', [Validators.required]],
      disponible: [disponible],
      fechaAlta: [libro?.fechaAlta || '', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.libroForm().valid) {
      const libro = this.libroForm().value as Libro;
      if (this.id) {
        this.gestionarLibros.actualizarLibro(this.id, libro).subscribe((libroGuardado) => {
          if (libroGuardado) {
            this.router.navigate(['/catalogo']);
          } else {
            alert('No se ha podido modificar el libro');
          }
        });
      } else {
        this.gestionarLibros.addLibro(libro).subscribe((libroGuardado) => {
          if (libroGuardado) {
            this.router.navigate(['/catalogo']);
          } else {
            alert('No se ha podido añadir el libro');
          }
        });
      }
    } else {
      this.libroForm().markAllAsTouched();
    }
  }

  get f() {
    return this.libroForm().controls;
  }

}