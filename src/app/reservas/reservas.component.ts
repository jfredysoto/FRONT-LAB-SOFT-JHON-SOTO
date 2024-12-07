import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../services/reservas.service';
import { AuthService } from '../services/auth.service';  // Asegúrate de tener un servicio de autenticación
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule], // Importamos el CommonModule para usar directivas como ngIf
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {
  reservas: any[] = [];
  usuarioId: string = '';
  maxReservas = 5; // Límite de reservas activas
  reservasForm: FormGroup;

  constructor(
    private reservasService: ReservasService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.reservasForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.usuarioId = localStorage.getItem('userId') || '';  // Obtener el ID del usuario autenticado
    if (this.usuarioId) {
      this.obtenerReservas();
    }
  }

  obtenerReservas(): void {
    // Llamar al servicio para obtener las reservas del usuario autenticado
    this.reservasService.obtenerReservas(this.usuarioId).subscribe(
      (data) => {
        this.reservas = data; // Asumimos que la respuesta tiene las reservas activas
        this.liberarReservasVencidas();  // Liberar las reservas que ya han pasado 24 horas
      },
      (error) => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }

  liberarReservasVencidas(): void {
    const ahora = new Date();
    this.reservas.forEach((reserva) => {
      const fechaReserva = new Date(reserva.fechaReserva);  // Asumimos que la reserva tiene un campo fechaReserva
      const diferenciaHoras = (ahora.getTime() - fechaReserva.getTime()) / (1000 * 3600);
      if (diferenciaHoras > 24) {
        // Liberar reserva si han pasado 24 horas
        this.liberarReserva(reserva.id);
      }
    });
  }

  liberarReserva(reservaId: number): void {
    // Llamar al servicio para liberar una reserva
    this.reservasService.liberarReserva(reservaId).subscribe(
      () => {
        console.log('Reserva liberada');
        this.obtenerReservas();  // Actualizamos las reservas después de liberar una
      },
      (error) => {
        console.error('Error al liberar la reserva', error);
      }
    );
  }
}

