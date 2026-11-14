import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Prestamo } from '../interfaces/prestamo';
import { GestionarPrestamos } from '../servicios/gestionar-prestamos';
import { Libro } from '../interfaces/libro';
import { GestionarLibros } from '../servicios/gestionar-libros';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-tabla-prestamos',
  styleUrl: './tabla-prestamos.css',
  templateUrl: './tabla-prestamos.html',
})

export class TablaPrestamos implements OnInit {
  private gestionarPrestamos = inject(GestionarPrestamos);
  prestamos = signal<Prestamo[]>([]);
  private gestionarLibros = inject(GestionarLibros);
  libros = signal<Libro[]>([]);
  private fb = inject(FormBuilder);
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  idUsuario = this.gestionarComunicaciones.idUsuario;
  private router = inject(Router);
  rol = this.gestionarComunicaciones.rol;

  prestamoForm = this.fb.group({
    idLibro: ['', [Validators.required]]
  });

  librosDisponibles = computed(() => this.libros().filter(libro => libro.disponible));

  ngOnInit() {
  if (this.rol() !== 'admin') {
    this.router.navigate(['/dashboard']);
    return;
  }
  this.getPrestamos();
  this.getLibros();
}

  getPrestamos() {
    this.gestionarPrestamos.getPrestamos().subscribe((prestamos: Prestamo[]) => {
      this.prestamos.set(prestamos);
    })
  }

  getLibros() {
    this.gestionarLibros.getLibros().subscribe((libros: Libro[]) => {
      this.libros.set(libros);
    })
  }

  tituloLibro(idLibro: string): string {
    const encontrado = this.libros().find(item => item._id === idLibro)
    return encontrado?.titulo || 'Libro eliminado';
  }

  ampliarPrestamo(prestamo: Prestamo) {
    const fecha = new Date(prestamo.fechaDevolucion);
    fecha.setUTCDate(fecha.getUTCDate() + 7);

    const prestamoActualizado: Prestamo = {
      _id: prestamo._id,
      idLibro: prestamo.idLibro,
      idUsuario: prestamo.idUsuario,
      fechaPrestamo: prestamo.fechaPrestamo,
      fechaDevolucion: fecha.toISOString().slice(0, 10),
      ampliado: true,
      devuelto: prestamo.devuelto
    };

    this.gestionarPrestamos.actualizarPrestamo(prestamo._id, prestamoActualizado).subscribe((respuesta) => {
      if (respuesta) {
        this.getPrestamos();
      } else {
        alert('No se ha podido ampliar el préstamo');
      }
    });
  }

  devolverPrestamo(prestamo: Prestamo) {
    this.gestionarPrestamos.actualizarPrestamo(prestamo._id, { devuelto: true } as Prestamo).subscribe((respuesta) => {
      if (respuesta) {
        this.marcarLibroDisponible(prestamo.idLibro);
        this.getPrestamos();
      } else {
        alert('No se ha podido marcar como devuelto');
      }
    });
  }

  marcarLibroDisponible(idLibro: string) {
    const libro = this.libros().find(item => item._id === idLibro);
    if (libro) {
      this.gestionarLibros.actualizarLibro(libro._id, { disponible: true } as Libro).subscribe(() => {
        this.getLibros();
      });
    }
  }

  eliminarPrestamo(prestamo: Prestamo) {
    this.gestionarPrestamos.deletePrestamo(prestamo._id).subscribe((respuesta) => {
      if (respuesta) {
        this.getPrestamos();
      } else {
        alert('No se ha podido eliminar el préstamo');
      }
    });
  }

  crearPrestamo() {
    if (this.prestamoForm.valid) {
      const idLibro = this.prestamoForm.value.idLibro as string;

      const hoy = new Date();
      const devolucion = new Date();
      devolucion.setUTCDate(devolucion.getUTCDate() + 14);

      const prestamo = {
        idLibro: idLibro,
        idUsuario: this.idUsuario(),
        fechaPrestamo: hoy.toISOString().slice(0, 10),
        fechaDevolucion: devolucion.toISOString().slice(0, 10),
        ampliado: false,
        devuelto: false
      } as Prestamo;

      this.gestionarPrestamos.addPrestamo(prestamo).subscribe((respuesta) => {
        if (respuesta) {
          this.marcarLibroNoDisponible(idLibro);
          this.prestamoForm.reset({ idLibro: '' });
          this.getPrestamos();
        } else {
          alert('No se ha podido crear el préstamo');
        }
      });
    } else {
      this.prestamoForm.markAllAsTouched();
    }
  }

  marcarLibroNoDisponible(idLibro: string) {
    this.gestionarLibros.actualizarLibro(idLibro, { disponible: false } as Libro).subscribe(() => {
      this.getLibros();
    });
  }

}


