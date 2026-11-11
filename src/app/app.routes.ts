import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Catalogo } from './catalogo/catalogo';
import { Carrito } from './carrito/carrito';
import { DetallesLibros } from './detalles-libros/detalles-libros';
import { TablaPrestamos } from './tabla-prestamos/tabla-prestamos';
import { FiltroLibros } from './filtro-libros/filtro-libros';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, //ESTO PARA QUE AL ABRIRLO MUESTRE LOGIN
    { path: 'dashboard', component: DashboardComponent },
    { path: 'catalogo', component: Catalogo },
    { path: 'carrito', component: Carrito },
    { path: 'detalle/:id', component: DetallesLibros }, 
    { path: 'prestamos', component: TablaPrestamos} ,
    { path: 'filtro/:id' , component: FiltroLibros}
];
