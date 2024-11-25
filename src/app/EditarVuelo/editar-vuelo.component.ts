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
  vuelos: any[] = []; // Puedes especificar un tipo más preciso si tienes un modelo definido

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
      this.route.paramMap.subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.vueloId = +id;
          this.cargarVuelo(this.vueloId);
        }
      });
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


  cargarVuelo(id: number): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.vuelosService.obtenerVueloPorId(id).subscribe(
          vuelo => {
            if (vuelo) {
              this.vueloForm.patchValue(vuelo);
            }
          },
          error => {
            console.error('Error al cargar los datos del vuelo:', error);
          }
        );
      }
    });    
  }
  
  

  editarVuelo(): void {
    if (this.vueloId !== null && this.vueloForm.valid) {
      this.vuelosService.editarVuelo(this.vueloId!, this.vueloForm.value).subscribe(
        response => {
          console.log('Vuelo actualizado exitosamente:', response);
          alert('Vuelo actualizado correctamente');
          this.router.navigate(['/vuelos']);
        },
        error => {
          console.error('Error al actualizar el vuelo:', error);
          alert('Ocurrió un error al actualizar el vuelo.');
        }
      );      
    } else {
      console.log('ID del vuelo:', this.vueloId);
      console.log('Estado del formulario:', this.vueloForm.valid);
    console.log('Valores del formulario:', this.vueloForm.value);
      alert('El ID del vuelo no es válido o faltan campos por completar.');
    }
  }
  
}
