import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VuelosService } from '../services/vuelos/vuelos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-vuelo',
  templateUrl: './crear-vuelo.component.html',
  styleUrls: ['./crear-vuelo.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
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
  fechaLlegada: string = ''; // Fecha calculada de llegada
  tiempoEstimadoVuelo: number = 0; // En horas, calculado según origen y destino
  costoVuelo: number | null = null;
  // Diccionario con tiempos estimados de vuelo en horas
  tiempoDeVueloEstimado: { [key: string]: number } = {
    // Vuelos Nacionales
    'Bogotá-Barranquilla': 1.5,
    'Bogotá-Cali': 1.5,
    'Bogotá-Cartagena': 1.25,
    'Bogotá-Medellín': 1,
    'Bogotá-Pereira': 1,
    'Cali-Barranquilla': 1.5,
    'Cali-Cartagena': 1.5,
    'Cali-Medellín': 1,
    'Cali-Pereira': 0.75,
    'Cartagena-Barranquilla': 3,
    'Cartagena-Medellín': 1.5,
    'Cartagena-Pereira': 1.75,
    'Medellín-Pereira': 0.5,
    'Medellín-Barranquilla': 1.25,
    'Pereira-Barranquilla': 3,

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

  zonaHorariaDestinos: { [key: string]: number } = {
    'Barranquilla': -5,
    'Bogotá': -5,
    'Cali': -5,
    'Medellín': -5,
    'Cartagena': -5,
    'Pereira': -5,
    'Madrid': 1,
    'Buenos Aires': -3,
    'Londres': 0,
    'Miami': -5,
    'New York': -5
    // Agregar más destinos según sea necesario
  };

  costoVueloPorDestino: { [key: string]: number } = {
    'Bogotá': 200, // Costo base en la moneda local
    'Cali': 150,
    'Medellín': 180,
    'Cartagena': 220,
    'Madrid': 800,
    'Buenos Aires': 700,
    'Londres': 900,
    'Miami': 600,
    'New York': 750,
  };


  constructor(private fb: FormBuilder, private vuelosService: VuelosService) {

    this.vueloForm = this.fb.group({
      tipoVuelo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      tiempoEstimado: [{ value: '', disabled: true }],
      costoVuelo: [this.costoVuelo, [Validators.required, Validators.min(1)]], // Campo de costo
    });
    this.todayDate = this.getTodayDate();
  }

  ngOnInit(): void {
    this.obtenerProximoIdVuelo();
    // Suscripciones existentes
    this.vueloForm.get('origen')?.valueChanges.subscribe(() => this.calcularTiempoEstimado());
    this.vueloForm.get('destino')?.valueChanges.subscribe(() => this.calcularTiempoEstimado());
    this.vueloForm.get('fechaVuelo')?.valueChanges.subscribe(() => this.calcularFechaLlegada());
    this.vueloForm.get('horaVuelo')?.valueChanges.subscribe(() => this.calcularFechaLlegada());
    this.vueloForm.get('destino')?.valueChanges.subscribe(() => this.calcularCostoVuelo());
  }

  calcularCostoVuelo(): void {
    const destino = this.vueloForm.get('destino')?.value;
    if (destino){
      this.costoVuelo = this.costoVueloPorDestino[destino] || 0; // Obtiene el costo basado en el destino
      this.vueloForm.get('costoVuelo')?.setValue(this.costoVuelo); // Actualiza el campo del costo
    }
  }

  calcularTiempoEstimado(): void {
    const origen = this.vueloForm.get('origen')?.value;
    const destino = this.vueloForm.get('destino')?.value;

    if (origen && destino && origen !== destino){
      const keyDirecto = `${origen}-${destino}`;
      const keyInverso = `${destino}-${origen}`;

      // Busca en ambas direcciones (origen-destino y destino-origen)
      this.tiempoEstimadoVuelo = this.tiempoDeVueloEstimado[keyDirecto] || this.tiempoDeVueloEstimado[keyInverso] || 0;
      this.tiempoEstimado = this.tiempoEstimadoVuelo ? `${this.tiempoEstimadoVuelo} hrs` : 'Tiempo no disponible';

      // Actualiza la fecha de llegada
      this.calcularFechaLlegada();

    } else {
      this.tiempoEstimado = 'N/A';
    }
  }

  calcularFechaLlegada(): void{
    const fechaVuelo = this.vueloForm.get('fechaVuelo')?.value;
    const horaVuelo = this.vueloForm.get('horaVuelo')?.value;
    const destino = this.vueloForm.get('destino')?.value;

    if (fechaVuelo && horaVuelo && this.tiempoDeVueloEstimado && destino){

      const fechaSalida = new Date(`${fechaVuelo}T${horaVuelo}`);

      const offsetOrigen = -5; // UTC-5 para Colombia
      fechaSalida.setHours(fechaSalida.getHours());

      const tiempoEstimadoMs = this.tiempoEstimadoVuelo * 60 * 60 * 1000; // Convertir horas a milisegundos
      console.log(tiempoEstimadoMs);

      const test = fechaSalida.getTime();
      console.log(fechaSalida);

      // Calcula la fecha de llegada sumando el tiempo estimado a la fecha y hora de salida
      const fechaLlegadaObj = new Date(fechaSalida.getTime() + tiempoEstimadoMs);

      // Ajustar la hora de llegada según la zona horaria del destino
      const offsetDestino = this.zonaHorariaDestinos[destino] || 0; // Usar 0 si el destino no está en el diccionario
      fechaLlegadaObj.setHours(fechaLlegadaObj.getHours() + offsetDestino);
      console.log(fechaLlegadaObj);


      // Formatea la fecha de llegada correctamente usando fechaLlegadaObj
      this.fechaLlegada = fechaLlegadaObj.toISOString().slice(0, 16); // Formato "YYYY-MM-DDTHH:mm"
     } else {
      this.fechaLlegada = ''; // Resetea si faltan datos
    }
  }

  // Esta función debe llamarse al seleccionar origen o destino
  onSeleccionarRuta(): void {
    this.calcularTiempoEstimado();
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


