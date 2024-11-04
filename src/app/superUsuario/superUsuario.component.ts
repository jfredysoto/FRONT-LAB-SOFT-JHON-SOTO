import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-super-usuario',
  templateUrl: './superUsuario.component.html',
  styleUrls: ['./superUsuario.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SuperUsuarioComponent implements OnInit {
  listaAdministradores: any[] = [];
  
  // Definición completa de `adminData` con todos los campos necesarios
  adminData = {
    id: 0,
    dni: '', 
    nombres: '', 
    apellidos: '', 
    fechaNacimiento: '', 
    lugarNacimiento: '', 
    direccionFacturacion: '', 
    genero: '', 
    correo: '', 
    usuario: '', 
    contrasena: '', 
    notis: false,
    idTipo: 2,  // Especifica que es tipo 2 para administrador
    imagen: null  // Campo para la imagen opcional
  };
  
  isEditMode = false;
  mensajeError = '';
  mensajeExito = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarAdministradores();
  }

   // Método para cargar administradores
   cargarAdministradores(): void {
    this.authService.getAdministradores().subscribe(
      (administradores: any[]) => {
        this.listaAdministradores = administradores.filter((admin: any) => admin.idTipo === 2);
        this.mensajeExito = 'Administradores cargados exitosamente';
      },
      (error: any) => {
        this.mensajeError = 'Error al cargar administradores';
      }
    );
  }

  // Dentro de SuperUsuarioComponent
private calcularEdad(fechaNacimiento: string): number {
  const fechaNacimientoDate = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
  const mes = hoy.getMonth() - fechaNacimientoDate.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimientoDate.getDate())) {
    edad--;
  }
  
  return edad;
}

// Modifica el método agregarAdministrador para validar la edad
agregarAdministrador(): void {
  const edad = this.calcularEdad(this.adminData.fechaNacimiento);
  
  if (edad < 18) {
    this.mensajeError = 'El administrador debe ser mayor de 18 años.';
    return; // Detener la ejecución si la edad es menor a 18
  }

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


  // Método para cargar datos de un administrador en modo de edición
  cargarAdministrador(admin: any): void {
    this.isEditMode = true;
    this.adminData = { ...admin };
  }

  // Método para modificar un administrador existente
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

  // Método para restablecer el formulario
  resetForm(): void {
    this.isEditMode = false;
    this.adminData = {
      id: 0,
      dni: '', 
      nombres: '', 
      apellidos: '', 
      fechaNacimiento: '', 
      lugarNacimiento: '', 
      direccionFacturacion: '', 
      genero: '', 
      correo: '', 
      usuario: '', 
      contrasena: '', 
      notis: false,
      idTipo: 2,
      imagen: null
    };
  }

  // Método para manejar la selección de archivo de imagen de usuario
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.adminData.imagen = file;
    }
  }
  
}






