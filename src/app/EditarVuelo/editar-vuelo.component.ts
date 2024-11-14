import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VuelosService } from '../services/vuelos/vuelos.service'; 
import { Vuelo } from '../Modelos/vuelo.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-vuelo',
  templateUrl: './editar-vuelo.component.html',
  styleUrls: ['./editar-vuelo.component.scss'],
   standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditarVueloComponent implements OnInit {
  vueloForm: FormGroup;
  vueloId: number | null = null;
  ciudadesOrigen: string[] = [];
  ciudadesDestino: string[] = [];
  mensajeExito: string = '';
  mensajeError: string = '';
  vuelos: any[] = []; // Puedes especificar un tipo más preciso si tienes un modelo definido

  constructor(private fb: FormBuilder, private vuelosService: VuelosService) {
    this.vueloForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      costoPorPersona: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.vuelosService.obtenerVuelos().subscribe(
      (vuelos) => {
        this.vuelos = vuelos; // Guarda los vuelos obtenidos en una variable del componente
      },
      (error) => {
        console.error('Error al cargar los vuelos:', error);
      }
    );
    this.cargarCiudades();
  }

  onOrigenChange(): void {
    const origenSeleccionado = this.vueloForm.get('origen')?.value;
    // Lógica adicional para actualizar el destino si es necesario.
    console.log('Origen seleccionado:', origenSeleccionado);
  }

  onDestinoChange(): void {
    // Lógica para manejar el cambio de destino, si es necesario
    console.log('Destino cambiado:', this.vueloForm.get('destino')?.value);
  }

  cargarCiudades(): void {
    this.vuelosService.obtenerCiudadesDisponibles('nacional').subscribe(
      (ciudades) => {
        this.ciudadesOrigen = ciudades;
        this.ciudadesDestino = ciudades;
      },
      (error) => {
        console.error('Error al cargar las ciudades', error);
      }
    );
  }


  cargarVueloParaEditar(vueloId: number): void {
    this.vuelosService.obtenerVueloPorId(vueloId).subscribe(
      (vuelo) => {
        if (vuelo) {
          this.vueloForm.patchValue({
            origen: vuelo.origen,
            destino: vuelo.destino,
            fechaVuelo: vuelo.fechaVuelo.split('T')[0], // Ajuste de formato de fecha
            horaVuelo: vuelo.horaVuelo,
            costoPorPersona: vuelo.costoPorPersona
          });
        }
      },
      (error) => {
        console.error('Error al cargar los datos del vuelo', error);
      }
    );
  }
  
  

  editarVuelo(): void {
    const id = this.vueloForm.get('id')?.value; // Obtener el ID del formulario
    if (id && this.vueloForm.valid) {
      this.vuelosService.editarVuelo(id, this.vueloForm.value).subscribe(
        (response) => {
          console.log('Vuelo actualizado exitosamente', response);
          alert('Vuelo actualizado con éxito.');
          // Redirigir o actualizar la vista si es necesario
        },
        (error) => {
          console.error('Error al actualizar el vuelo', error);
          alert('Ocurrió un error al actualizar el vuelo.');
        }
      );
    } else {
      console.warn('El formulario no es válido o no tiene un ID');
      alert('Por favor, completa todos los campos correctamente.');
    }
  }     
}
