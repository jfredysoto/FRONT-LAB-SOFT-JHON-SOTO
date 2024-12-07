import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../Register/register.component';
import { CommonModule } from '@angular/common';
import { CambiarContrasenaComponent } from '../CambiarContraseña/cambiar-contraseña.component';
import { VuelosService } from '../services/vuelos/vuelos.service';
import { Vuelo } from '../Modelos/vuelo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RegisterComponent, CambiarContrasenaComponent],
})
export class HomeComponent implements OnInit {
  origin: string = 'Bogotá (BOG)';
  destination: string = '';
  departureDate: string = '2024-10-02';
  returnDate: string = '2024-10-05';
  passengers: number = 1;
  showModal: boolean = false;
  vuelos: any[] = []; // Lista de vuelos cargados

  constructor(private vuelosService: VuelosService) {}

  ngOnInit(): void {
    this.cargarVuelos();
  }

  cargarVuelos(): void {
    this.vuelosService.obtenerVuelos().subscribe(
      (vuelos: any[]) => {
        console.log('Vuelos recibidos:', vuelos); // Asegúrate de que los datos se reciban correctamente
        this.vuelos = vuelos;  // Asigna los vuelos a la variable de la vista
      },
      (error) => {
        console.error('Error al cargar los vuelos:', error);
      }
    );
  }
  
  
  

  buscarVuelos(): void {
    const filtros = {
      origen: this.origin,
      destino: this.destination,
      fechaVuelo: this.departureDate,
    };

    this.vuelosService.buscarVuelos(filtros).subscribe(
      (vuelos) => {
        this.vuelos = vuelos; // Actualizar lista de vuelos con los resultados
      },
      (error) => {
        console.error('Error al buscar vuelos:', error);
      }
    );
  }
  

  openHotels() {
    console.log('Opening hotel search...');
  }

  openCars() {
    console.log('Opening car rental options...');
  }

  openChangePasswordModal() {
    this.showModal = true;
  }

  closeChangePasswordModal() {
    this.showModal = false;
  }

  offers = [
    { destination: 'armenia', price: 'COP 147.000', imageUrl: 'assets/img/armenia.jpg' },
    { destination: 'medellín', price: 'COP 152.900', imageUrl: 'ruta/a/imagen/medellin.jpg' },
    { destination: 'bucaramanga', price: 'COP 174.900', imageUrl: 'ruta/a/imagen/bucaramanga.jpg' },
  ];

  preparationOptions = [
    {
      title: 'Check-in online',
      description: 'Obtén tu pase de abordar y ahorra tiempo en el aeropuerto.',
      icon: 'ruta/a/icono/check-in-online.svg',
    },
    {
      title: 'Centro de ayuda',
      description: 'Busca y encuentra información útil para resolver tus preguntas.',
      icon: 'ruta/a/icono/centro-de-ayuda.svg',
    },
    {
      title: 'Requisitos para viajar',
      description: 'Infórmate acerca de visas, vacunas y demás documentos.',
      icon: 'ruta/a/icono/requisitos.svg',
    },
  ];
}

