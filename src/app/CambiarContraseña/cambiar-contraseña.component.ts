import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contraseña.component.html',
  styleUrls: ['./cambiar-contraseña.component.scss'],
  standalone: true,  // El componente es standalone
  imports: [CommonModule, ReactiveFormsModule]  // Importa ReactiveFormsModule aquí
})
export class CambiarContrasenaComponent {
  cambiarContrasenaForm: FormGroup;
  mensajeError: string = '';
  showModal: boolean = true;  // Controla si el modal se muestra
  // Control de visibilidad para cada campo de contraseña
  passwordVisible = {
    contrasenaActual: false,
    nuevaContrasena: false,
    confirmarContrasena: false
  };

  constructor(private fb: FormBuilder) {
    this.cambiarContrasenaForm = this.fb.group({
      contrasenaActual: ['', [Validators.required]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    });
  }

  cambiarContrasena() {
    const { contrasenaActual, nuevaContrasena, confirmarContrasena } = this.cambiarContrasenaForm.value;

    if (nuevaContrasena !== confirmarContrasena) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    console.log('Contraseña cambiada con éxito:', nuevaContrasena);
    this.mensajeError = '';
    alert('Contraseña cambiada con éxito');
    this.cerrarModal();  // Cierra el modal después de cambiar la contraseña
  }

  cerrarModal() {
    this.showModal = false;  // Oculta el modal
    console.log('Modal cerrado');
  }

  // Controlar la visibilidad de las contraseñas
  togglePasswordVisibility(field: 'contrasenaActual' | 'nuevaContrasena' | 'confirmarContrasena') {
    this.passwordVisible[field] = !this.passwordVisible[field];
  }
}




