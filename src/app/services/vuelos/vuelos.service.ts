// vuelos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vuelo } from '../../Modelos/vuelo.model';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl = 'http://localhost:5113/api/vuelos';

  constructor(private http: HttpClient) {}

  crearVuelo(vueloData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-vuelo`, vueloData);
  }

  editarVuelo(id: number, vueloData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vuelos/editar-vuelo/${id}`, vueloData);
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

  // Obtener la lista de vuelos
  obtenerVuelos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-vuelos`); // Verifica que la ruta esté correctamente configurada
  }

  obtenerVueloPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vuelos/${id}`);
  }
  
  buscarVuelos(filtros: any): Observable<any[]> {
    let params = new HttpParams();
  
    if (filtros.origen) {
      params = params.set('origen', filtros.origen);
    }
    if (filtros.destino) {
      params = params.set('destino', filtros.destino);
    }
    if (filtros.fechaVuelo) {
      params = params.set('fechaVuelo', filtros.fechaVuelo);
    }
  
    return this.http.get<any[]>(`${this.apiUrl}/obtener-vuelos`, { params });
  }
  // Método para cancelar la compra y procesar el reembolso
  cancelarCompra(vueloId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancelar-compra`, { vueloId });
  }
  
}

