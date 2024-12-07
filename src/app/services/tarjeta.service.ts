import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetasService {
  private apiURL = 'http://localhost:5113/api/tarjetas';  // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  // Método para agregar una tarjeta
  agregarTarjeta(usuarioId: string, tarjeta: any): Observable<any> {
    return this.http.post(`${this.apiURL}/agregar-tarjeta`, { usuarioId, ...tarjeta });
  }

  // Método para recargar saldo (con moneda)
  recargarSaldo(usuarioId: string, monto: number, moneda: string): Observable<any> {
    const body = { usuarioId, monto, moneda };
    return this.http.post<any>('http://localhost:5113/api/usuarios/recargar-saldo', body);
  }
}
