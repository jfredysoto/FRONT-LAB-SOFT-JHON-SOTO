import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para ngModel
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-super-usuario',
  templateUrl: './superUsuario.component.html',
  styleUrls: ['./superUsuario.component.scss'],
  standalone: true, // Marca el componente como standalone
  imports: [FormsModule, CommonModule] // Importa FormsModule aquí
})
export class SuperUsuarioComponent implements OnInit {
  listaAdministradores: any[] = [];
  adminData = { id: 0, nombre: '', email: '', idTipo: 1 }; // Define los campos requeridos
  isEditMode = false;
  mensajeError = '';
  mensajeExito = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

  cargarAdministradores(): void {
    this.authService.getAdministradores().subscribe(
      (administradores) => {
        this.listaAdministradores = administradores.filter(admin => admin.idTipo === 1); // Filtra solo administradores
        this.mensajeExito = 'Administradores cargados exitosamente';
      },
      (error: any) => {
        this.mensajeError = 'Error al cargar administradores';
      }
    );
  }

  agregarAdministrador(): void {
    this.authService.crearAdministrador(this.adminData).subscribe(
      () => {
        this.mensajeExito = 'Administrador agregado exitosamente';
        this.cargarAdministradores();
        this.resetForm();
      },
      (error: any) => {
        this.mensajeError = 'Error al agregar administrador';
      }
    );
  }

  cargarAdministrador(admin: any): void {
    this.isEditMode = true;
    this.adminData = { ...admin };
  }

  modificarAdministrador(): void {
    this.authService.modificarAdministrador(this.adminData.id, this.adminData).subscribe(
      () => {
        this.mensajeExito = 'Administrador modificado exitosamente';
        this.cargarAdministradores();
        this.resetForm();
      },
      (error: any) => {
        this.mensajeError = 'Error al modificar administrador';
      }
    );
  }

  resetForm(): void {
    this.isEditMode = false;
    this.adminData = { id: 0, nombre: '', email: '', idTipo: 1 };
  }
}





