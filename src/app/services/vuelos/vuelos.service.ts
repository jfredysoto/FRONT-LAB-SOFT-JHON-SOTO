// vuelos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl = 'http://localhost:5113/api/vuelos';

  constructor(private http: HttpClient) {}

  crearVuelo(vueloData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-vuelo`, vueloData);
  }

  obtenerProximoId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/proximo-id`);
  }

  obtenerCiudadesDisponibles(tipoVuelo: string): Observable<string[]>{
    let params = new HttpParams().set('tipoVuelo', tipoVuelo);
    return this.http.get<string[]>(`${this.apiUrl}/ciudades-disponibles`, { params });
  }

  // Método para agregar un vuelo
  agregarVuelo(vuelo: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-vuelo`, vuelo);
  }

  // Método para obtener la lista de vuelos
  obtenerVuelos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
