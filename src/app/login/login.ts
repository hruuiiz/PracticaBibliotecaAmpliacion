import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { GestionarComunicaciones } from '../servicios/gestionar-comunicaciones';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;

  private gestionarUsuarios = inject(GestionarUsuarios);
  private gestionarComunicaciones = inject(GestionarComunicaciones);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.gestionarUsuarios.login(this.loginForm.value.correo, this.loginForm.value.contrasena).subscribe((usuario) => {
        if (usuario) {
          this.gestionarComunicaciones.iniciarSesion(usuario);
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/registro']);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
