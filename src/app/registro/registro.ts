import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { GestionarUsuarios } from '../servicios/gestionar-usuarios';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})

export class Registro {

  registroForm: FormGroup;
  private gestionarUsuarios = inject(GestionarUsuarios);
  private router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')]] //Que tenga una minúscula, una mayúscula,
      //espacios, carácter raro y que tengo mínimo 8 caractéres
    })
  }

    onSubmit() {
    if (this.registroForm.valid) {
      this.gestionarUsuarios.registro(this.registroForm.value.correo, this.registroForm.value.contrasena).subscribe((usuario) => {
        if (usuario) {
          alert('Usuario registrado. Ya puedes iniciar sesión');
          this.router.navigate(['/login']);
        } else {
          alert('No se ha podido registrar. Puede que ese correo ya exista');
        }
      });
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registroForm.controls;
  }
}
