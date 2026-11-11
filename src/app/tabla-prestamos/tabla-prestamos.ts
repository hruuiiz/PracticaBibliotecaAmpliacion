import { Component , inject , OnInit, signal} from '@angular/core';
import { Prestamo } from '../interfaces/prestamo';
import { GestionarPrestamos } from '../servicios/gestionar-prestamos';

@Component({
  imports: [],
  selector: 'app-tabla-prestamos',
  styleUrl: './tabla-prestamos.css',
  templateUrl: './tabla-prestamos.html',
})

export class TablaPrestamos implements OnInit {
  private gestionarPrestamos = inject(GestionarPrestamos);
  prestamos=signal<Prestamo[]>([]);
  
  ngOnInit(){
    this.getPrestamos();
  }

  getPrestamos(){
    this.gestionarPrestamos.getPrestamos().subscribe((prestamos: Prestamo[])=>{
      this.prestamos.set(prestamos);
    })
  }
}
