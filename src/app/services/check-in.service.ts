import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  private apiURL = 'http://localhost:5113/api';

  constructor(private http: HttpClient) {}

  getUsuarioInfo(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/usuarios/${usuarioId}`);
  }

  checkIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/check-in`, data);
  }
}
