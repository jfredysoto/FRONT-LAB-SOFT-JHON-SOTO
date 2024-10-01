import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  origin: string = 'Bogotá (BOG)';
  destination: string = '';
  departureDate: string = '2024-10-02';
  returnDate: string = '2024-10-05';
  passengers: number = 1;

  searchFlights() {
    console.log(`Searching flights from ${this.origin} to ${this.destination}...`);
    // Aquí agregarás la lógica de búsqueda de vuelos
  }
  openHotels() {
    console.log('Opening hotel search...');
  }
  
  openCars() {
    console.log('Opening car rental options...');
  }
  

  offers = [
    { destination: 'armenia', price: 'COP 147.000', imageUrl: 'assets/img/armenia.jpg'},
    { destination: 'medellín', price: 'COP 152.900', imageUrl: 'ruta/a/imagen/medellin.jpg' },
    { destination: 'bucaramanga', price: 'COP 174.900', imageUrl: 'ruta/a/imagen/bucaramanga.jpg' }
  ];

  preparationOptions = [
    {
      title: 'Check-in online',
      description: 'Obtén tu pase de abordar y ahorra tiempo en el aeropuerto.',
      icon: 'ruta/a/icono/check-in-online.svg'
    },
    {
      title: 'Centro de ayuda',
      description: 'Busca y encuentra información útil para resolver tus preguntas.',
      icon: 'ruta/a/icono/centro-de-ayuda.svg'
    },
    {
      title: 'Requisitos para viajar',
      description: 'Infórmate acerca de visas, vacunas y demás documentos.',
      icon: 'ruta/a/icono/requisitos.svg'
    }
  ];
}

