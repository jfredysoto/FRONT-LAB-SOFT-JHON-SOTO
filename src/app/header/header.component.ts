import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EditarPerfilComponent } from '../editarperfil/editar-perfil.component'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showLoginMenu = false; // Controla la visibilidad del menú de login
  email: string = '';     // Guarda el email ingresado por el usuario
  password: string = '';  // Guarda la contraseña ingresada
  isLoggedIn: boolean = false; // Controla si el usuario está autenticado

  constructor(private router: Router) {
    // Verificar si el usuario ya está logueado al cargar el componente
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      this.email = storedEmail;
      this.isLoggedIn = true;
    }
  }

  login() {
    if (this.email === 'usuario@example.com' && this.password === '123456') {
      this.isLoggedIn = true;
      // Guardar el email en localStorage para mantener la sesión
      localStorage.setItem('userEmail', this.email);
      alert('Credenciales correctas');
      this.toggleLoginMenu();
    } else {
      alert('Credenciales incorrectas. Por favor, intente de nuevo.');
    }
  }

  toggleLoginMenu() {
    this.showLoginMenu = !this.showLoginMenu;
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.classList.toggle('active', this.showLoginMenu);
    }
  }
  

  // Método para cerrar la sesión
  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    // Eliminar la sesión guardada
    localStorage.removeItem('userEmail');
    // Redirigir al usuario a la página de inicio
    this.router.navigate(['/home']);
  }
}



