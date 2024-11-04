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
  tiempoEstimado: string = 'N/A';
  mensajeExito: string = '';
  mensajeError: string = '';
  proximoIdVuelo: number | null = null;
  ciudadesOrigen: string[] = [];
  ciudadesDestino: string[] = [];
  todayDate: string;

  // Diccionario con tiempos estimados de vuelo en horas
  tiempoDeVueloEstimado: { [key: string]: number } = {
    // Vuelos Nacionales
    'Bogotá-Cali': 1.5,
    'Bogotá-Cartagena': 1.25,
    'Bogotá-Medellín': 1,
    'Bogotá-Pereira': 1,
    'Cali-Cartagena': 1.5,
    'Cali-Medellín': 1,
    'Cali-Pereira': 0.75,
    'Cartagena-Medellín': 1.5,
    'Cartagena-Pereira': 1.75,
    'Medellín-Pereira': 0.5,

    // Vuelos Internacionales
    'Bogotá-Buenos Aires': 6.5,
    'Bogotá-Londres': 10,
    'Bogotá-Madrid': 8,
    'Bogotá-Miami': 3.5,
    'Bogotá-New York': 5,
    'Cali-Buenos Aires': 10,
    'Cali-Madrid': 9,
    'Cali-Miami': 4,
    'Cali-New York': 5.5,
    'Cartagena-Londres': 11,
    'Cartagena-Madrid': 9.5,
    'Cartagena-Miami': 3,
    'Cartagena-New York': 4.5,
    'Medellín-Buenos Aires': 9.5,
    'Medellín-Londres': 10.5,
    'Medellín-Madrid': 8.5,
    'Medellín-Miami': 3,
    'Medellín-New York': 5,
    'Pereira-Buenos Aires': 9,
    'Pereira-Londres': 10.5,
    'Pereira-Madrid': 9,
    'Pereira-Miami': 4,
    'Pereira-New York': 6,
  };


  constructor(private fb: FormBuilder, private vuelosService: VuelosService) {

    this.vueloForm = this.fb.group({
      tipoVuelo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      tiempoEstimado: [{ value: '', disabled: true }]
    });
    this.todayDate = this.getTodayDate();
  }

  ngOnInit(): void {
    this.obtenerProximoIdVuelo();
    this.vueloForm.get('origen')?.valueChanges.subscribe(() => this.calcularTiempoEstimado());
    this.vueloForm.get('destino')?.valueChanges.subscribe(() => this.calcularTiempoEstimado());
  }

  calcularTiempoEstimado(): void {
    const origen = this.vueloForm.get('origen')?.value;
    const destino = this.vueloForm.get('destino')?.value;

    if (origen && destino && origen !== destino){
      const key = [origen, destino].sort().join('-');
      //const key = `${origen}-${destino}`;
      const tiempo = this.tiempoDeVueloEstimado[key];

      this.tiempoEstimado = tiempo ? `${tiempo} hrs` : 'Tiempo no disponible';
    } else {
      this.tiempoEstimado = 'N/A';
    }
  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
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

  onOrigenChange(): void {
    const tipoVuelo = this.vueloForm.get('tipoVuelo')?.value;
    const origen = this.vueloForm.get('origen')?.value;

    if (tipoVuelo === 'nacional'){
      // Filtra las ciudades nacionales excluyendo la ciudad de origen seleccionada
      this.ciudadesDestino = this.ciudadesOrigen.filter(ciudad => ciudad !== origen);
    } else if (tipoVuelo === 'internacional'){
      // Para vuelos internacionales, filtra según el origen
      if(['Pereira', 'Bogotá', 'Medellín', 'Cali', 'Cartagena'].includes(origen)){
        // Si el origen es una ciudad colombiana, muestra solo destinos internacionales
        this.ciudadesDestino = this.ciudadesOrigen.filter(ciudad =>
          !['Pereira', 'Bogotá', 'Medellín', 'Cali', 'Cartagena'].includes(ciudad)
        );
      } else {
        // Si el origen es internacional, muestra solo destinos colombianos
        this.ciudadesDestino = this.ciudadesOrigen.filter(ciudad =>
          ['Pereira', 'Bogotá', 'Medellín', 'Cali', 'Cartagena'].includes(ciudad)
        );
      }
    }
  }

  onTipoVueloChange(): void {
    const tipoVuelo = this.vueloForm.get('tipoVuelo')?.value;
    if(tipoVuelo){
      this.vuelosService.obtenerCiudadesDisponibles(tipoVuelo).subscribe({
        next: (ciudades) => {
          if(tipoVuelo.toLowerCase() === 'nacional'){
            this.ciudadesOrigen = ciudades;
            this.ciudadesDestino = ciudades;
          } else if (tipoVuelo.toLowerCase() === 'internacional'){
            this.ciudadesOrigen = ciudades; // Las primeras 5 son orígenes
            this.ciudadesDestino = ciudades; // El resto son destinos
          }
        },
        error: (err) => this.mensajeError = 'Error al cargar las ciudades diisponibles'
      });
    }
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


