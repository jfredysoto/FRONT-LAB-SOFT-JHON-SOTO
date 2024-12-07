import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiURL = 'http://localhost:5113/api/reservas';  // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  // Método para obtener las reservas activas de un cliente
  obtenerReservas(usuarioId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/usuario/${usuarioId}`);
  }

  // Método para liberar una reserva
  liberarReserva(reservaId: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/liberar/${reservaId}`);
  }
}
