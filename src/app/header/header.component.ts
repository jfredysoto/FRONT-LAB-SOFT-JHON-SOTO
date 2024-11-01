import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLoginMenu = false; // Controla la visibilidad del menú de login
  email: string = '';     // Guarda el email ingresado por el usuario
  password: string = '';  // Guarda la contraseña ingresada
  userId: string = '';
  isLoggedIn: boolean = false; // Controla si el usuario está autenticado
  accountDeletedMessage: string | null = null;
  isRoot: boolean = false; // Verifica si el usuario es SuperUsuario (Root)
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');

    if (storedEmail && storedUserId) {
      this.email = storedEmail;
      this.userId = storedUserId;
      this.isLoggedIn = true;
      this.isRoot = this.authService.isRoot(); // Verifica si es SuperUsuario
    }
  }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  deleteAccount(): void {
    const userId = this.getUserId();
    console.log("ID del usuario:", userId);

    if (!userId) {
      console.error('Error: No se encontró el ID del usuario en el localStorage');
      this.accountDeletedMessage = 'No se pudo obtener el ID del usuario.';
      return;
    }

    this.authService.desactivarUsuario(userId).subscribe(
      response => {
        console.log('Cuenta eliminada exitosamente', response);
        this.authService.logout();

        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');

        this.accountDeletedMessage = 'Su cuenta ha sido eliminada exitosamente.';

        setTimeout(() => {
          this.accountDeletedMessage = null;
          this.router.navigate(['/']); // Redirige a la página principal
        }, 3000);
      },
      error => {
        console.error('Error al eliminar la cuenta', error);
        this.accountDeletedMessage = 'Ocurrió un error al intentar eliminar la cuenta. Inténtelo de nuevo.';
      }
    );
  }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.exito) {
          this.isLoggedIn = true;
          localStorage.setItem('userEmail', this.email);

          if (response.userId) {
            localStorage.setItem('userId', response.userId);
            this.userId = response.userId;
          } else {
            console.error('No se recibió el ID del usuario en la respuesta');
          }

          if (response.userType) {
            this.authService.setUserType(response.userType);
            this.isRoot = this.authService.isRoot(); // Verifica si es SuperUsuario
          }

          alert('Inicio de sesión exitoso');
          this.toggleLoginMenu();
          this.router.navigate(['/header']);
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud', error);
        alert('Ocurrió un error al iniciar sesión');
      }
    );
  }

  toggleLoginMenu(): void {
    this.showLoginMenu = !this.showLoginMenu;
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.classList.toggle('active', this.showLoginMenu);
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.userId = '';
    this.isRoot = false;

    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  editarPerfil(): void {
    console.log('Editar perfil');
  }
}


