import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VuelosService } from '../services/vuelos/vuelos.service';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class CrearVueloComponent implements OnInit{
  vueloForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  proximoIdVuelo: number | null = null;

  constructor(private fb: FormBuilder, private vuelosService: VuelosService) {
    this.vueloForm = this.fb.group({
      tipoVuelo: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerProximoIdVuelo();
  }

  obtenerProximoIdVuelo(): void {
    this.vuelosService.obtenerProximoId().subscribe({
      next: (id) => {
        this.proximoIdVuelo = id;
      },
      error: (err) => {
        console.error('Error al obtener el próximo ID:', err);
        this.mensajeError = 'Error al cargar el ID del vuelo';
      }
    });
  }

  crearVuelo(): void {
    if (this.vueloForm.valid) {
      console.log('Formulario de vuelo enviado', this.vueloForm.value);
      this.mensajeExito = 'Vuelo creado exitosamente';
      this.mensajeError = '';
    } else {
      console.error('Formulario inválido');
      this.mensajeError = 'Por favor, complete todos los campos correctamente';
      this.mensajeExito = '';
    }
  }
}


