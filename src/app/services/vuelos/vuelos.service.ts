// vuelos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  private apiUrl = 'http://localhost:5113/api/vuelos';

  constructor(private http: HttpClient) {}

  obtenerProximoId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/proximo-id`);
  }
}
