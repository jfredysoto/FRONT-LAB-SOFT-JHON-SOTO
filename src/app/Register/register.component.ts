import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CondicionesServicioComponent } from '../condiciones-servicio/condiciones-servicio.component';
import { CommonModule } from '@angular/common';
import { PoliticaPrivacidadComponent } from '../politica-privacidad/politica-privacidad.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,CondicionesServicioComponent, PoliticaPrivacidadComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  documento: string = '';
  nombre: string = '';
  apellido: string = '';
  fecha_nacimiento: string = '';
  lugar_nacimiento: string = '';
  direccion: string = '';
  genero: number = 1; // 1 para hombre, 2 para mujer
  notis: boolean = false;
  id_tipo: number = 3; // Siempre 3 (cliente)
  estado: boolean = true; // Siempre true

  modalTitle: string = '';
  modalContent: string = '';

  

  constructor(private authService: AuthService, private router: Router) {}

  // Método para abrir el modal
  openModal(contentType: string) {
    this.modalContent = contentType;
    this.modalTitle = contentType === 'condiciones' ? 'Condiciones de Servicio' : 'Política de Privacidad';
    const modal = document.getElementById('modalDocument');
    if (modal) {
      modal.style.display = 'block'; // Muestra el modal
    }
  }
  // Método para cerrar el modal
  closeModal() {
    const modal = document.getElementById('modalDocument');
    if (modal) {
      modal.style.display = 'none'; // Cierra el modal
    }
  }


  onSubmit() {
    const user = {
      correo: this.email,
      usuario: this.username,
      contrasena: this.password,
      documento: this.documento,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fecha_nacimiento,
      lugarNacimiento: this.lugar_nacimiento,
      direccion: this.direccion,
      genero: this.genero,
      notis: this.notis,
      idTipo: this.id_tipo,
      estado: this.estado
    };

    this.authService.register(user).subscribe({
      next: (response) => {

        //console.log('Registro exitoso', response);
        // Si la respuesta es positiva, redirige al home o header
        alert("Usuario registrado correctamente");
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error en el registro', error);
        // Verificar si el error está relacionado con la edad
        // if (error.status === 400 && error.error.mensaje === '18') {
        if (error.status === 400) {
          //alert('Debes ser mayor de 18 años para registrarte.');
          alert (error.error.mensaje);
          console.error(error.error.mensaje);
        }
        else {
          alert('Hubo un error en el registro. Inténtalo de nuevo.');
        }
      }
    });

    console.log('Formulario enviado', user);
  }
}

