import { Injectable } from '@angular/core';
// Ignorar el chequeo de tipos para el módulo nominatim
// @ts-ignore
import * as nominatim from 'nominatim';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/search';

  constructor() { }

  searchPlaces(query: string): Promise<any> {
    const params = {
      format: 'json',
      addressdetails: 1,
      q: query
    };

    return fetch(`${this.nominatimUrl}?${this.encodeParams(params)}`)
      .then(response => response.json())
      .then(data => data);
  }

  private encodeParams(params: any): string {
    return Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
}