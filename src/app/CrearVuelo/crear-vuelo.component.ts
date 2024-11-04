import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CrearVueloComponent {
  vueloForm: FormGroup;
  mensajeExito: string = ''; // Define mensajeExito para mostrar mensajes de éxito
  mensajeError: string = ''; // Define mensajeError para mostrar mensajes de error

  constructor(private fb: FormBuilder) {
    this.vueloForm = this.fb.group({
      tipoVuelo: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    });
  }

  crearVuelo(): void {
    if (this.vueloForm.valid) {
      console.log('Formulario de vuelo enviado', this.vueloForm.value);
      this.mensajeExito = 'Vuelo creado exitosamente';
      this.mensajeError = ''; // Limpia cualquier mensaje de error previo
    } else {
      console.error('Formulario inválido');
      this.mensajeError = 'Por favor, complete todos los campos correctamente';
      this.mensajeExito = ''; // Limpia cualquier mensaje de éxito previo
    }
  }
}


