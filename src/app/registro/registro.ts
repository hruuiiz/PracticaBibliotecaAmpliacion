import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})

export class Registro {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      correo: ["", [Validators.required, Validators.email]],
      contrasena: ["", [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$')]] //Que tenga una minúscula, una mayúscula,
      //espacios, carácter raro y que tengo mínimo 8 caractéres
    })
  }

  onSubmit() {
    if (this.registroForm.valid) {
      console.log("Formulario enviado:", this.registroForm.value);
    } else {
      this.registroForm.markAllAsTouched();
    }
  }

  get f() {
    return this.registroForm.controls;
  }
}
