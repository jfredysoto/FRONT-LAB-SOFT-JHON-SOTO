import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VuelosService } from '../services/vuelos/vuelos.service'; 
import { Vuelo } from '../Modelos/vuelo.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/router';
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
  vuelos: Vuelo[] = [];


  constructor(private fb: FormBuilder, private vuelosService: VuelosService, private route: ActivatedRoute, private router: Router) {
    this.vueloForm = this.fb.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      tiempoDeVuelo: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      horaLlegada: ['', Validators.required],
      costoPorPersona: ['', [Validators.required, Validators.min(0)]],
      estado: ['', Validators.required]
    });      
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.vueloId = +id; // Convierte el ID a número
        this.cargarVuelo();  // Llama a la función para cargar los datos del vuelo
      } else {
        console.error('El ID del vuelo no está presente en la URL.');
      }
    });
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

  cargarVuelo(): void {
    if (!this.vueloId) {
      console.error('El ID del vuelo no es válido.');
      return;
    }
  
    this.vuelosService.obtenerVueloPorId(this.vueloId).subscribe(
      (vuelo) => {
        if (vuelo) {
          // Aquí asignas los valores del vuelo a tu formulario
          this.vueloForm.patchValue({
            origen: vuelo.origen,
            destino: vuelo.destino,
            fechaVuelo: vuelo.fechaVuelo.split('T')[0], // Solo la fecha
            horaVuelo: vuelo.horaVuelo,
            tiempoDeVuelo: vuelo.tiempoDeVuelo,
            fechaLlegada: vuelo.fechaLlegada.split('T')[0],
            horaLlegada: vuelo.horaLlegada,
            costoPorPersona: vuelo.costoPorPersona,
            estado: vuelo.estado
          });
        } else {
          console.error('No se encontraron datos para el vuelo.');
          this.mensajeError = 'No se encontró el vuelo con el ID proporcionado.';
        }
      },
      (error) => {
        console.error('Error al obtener el vuelo:', error);
        this.mensajeError = 'Ocurrió un error al obtener el vuelo.';
      }
    );
  }
  
  


  editarVuelo(): void {
    if (!this.vueloId || !this.vueloForm.valid) {
      console.log('Formulario no válido', this.vueloForm);
      this.mensajeError = 'El formulario no es válido o falta el ID del vuelo.';
      return;
    }
  
    this.vuelosService.editarVuelo(this.vueloId, this.vueloForm.value).subscribe(
      (response) => {
        this.mensajeExito = 'Vuelo actualizado exitosamente.';
        this.router.navigate(['/vuelos']);
      },
      (error) => {
        console.error('Error al actualizar el vuelo:', error);
        this.mensajeError = error.error?.mensaje || 'Ocurrió un error al actualizar el vuelo.';
      }
    );
  }  
}
