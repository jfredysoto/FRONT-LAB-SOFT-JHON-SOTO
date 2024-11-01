import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Lógica para verificar el rol
    return true; // Cambia según tu lógica
  }
}
