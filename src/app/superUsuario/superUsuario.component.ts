import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
    selector: 'app-super-usuario',
    standalone: true,
    imports: [CommonModule, FormsModule,SuperUsuarioComponent,]
    templateUrl: './superUsuario.component.html',
    styleUrls: ['./superUsuario.component.scss']
  })
  export class SuperUsuarioComponent {
    // Lógica del componente

  users: any[] = [];       // Lista de usuarios
  flights: any[] = [];     // Lista de vuelos
  reservations: any[] = []; // Lista de reservas

  constructor(   
    
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();     // Carga inicial de los vuelos
    this.loadUsers();       // Carga inicial de los usuarios
    this.loadReservations(); // Carga inicial de las reservas
  }

  // Método para cargar la lista de usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Método para cargar la lista de vuelos
  loadFlights(): void {
    this.flightService.getFlights().subscribe((data) => {
      this.flights = data;
    });
  }

  // Método para cargar la lista de reservas
  loadReservations(): void {
    this.flightService.getReservations().subscribe((data) => {
      this.reservations = data;
    });
  }

  // Método para crear un nuevo usuario
  createUser(): void {
    this.userService.createUser({ /* datos del nuevo usuario */ }).subscribe(() => {
      this.loadUsers(); // Recargar la lista de usuarios después de la creación
    });
  }

  // Método para eliminar un usuario
  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Recargar la lista de usuarios después de la eliminación
    });
  }

 

  // Método para actualizar una configuración del sistema
  updateSystemConfig(config: any): void {
    this.systemConfigService.updateConfig(config).subscribe(() => {
      // Actualización exitosa
    });
  }

  // Navegación a la página de inicio de sesión si el usuario no tiene permisos
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
