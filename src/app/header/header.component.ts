import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showLoginMenu = false; // Controla la visibilidad del menú de login
  email: string = '';     // Guarda el email ingresado por el usuario
  password: string = '';  // Guarda la contraseña ingresada
  userId: string = '';
  isLoggedIn: boolean = false; // Controla si el usuario está autenticado
  accountDeletedMessage: string | null = null; // Declara la propiedad aquí


  constructor(private authService: AuthService,private router: Router) {
    // Verificar si el usuario ya está logeado al cargar el componente
    const storedEmail = localStorage.getItem('userEmail');
    const storedUserId = localStorage.getItem('userId');
    if (storedEmail && storedUserId){
      this.email = storedEmail;
      this.userId = storedUserId;
      this.isLoggedIn = true;
    }
  }

  deleteAccount() {
  //const userId = this.getUserId(); // Obtén el ID del usuario
  const userId = localStorage.getItem('userId');
  console.log("ID del usuario:", userId); // Verifica que el ID se está enviando correctamente

  if(!userId){
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

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.exito){
          this.isLoggedIn = true;
          localStorage.setItem('userEmail', this.email);

          if (response.userId) {
            localStorage.setItem('userId', response.userId);
            this.userId = response.userId; // Guarda el ID del usuario
          } else {
            console.error('No se recibió el ID del usuario en la respuesta');
          }

          if(response.userType){
            this.authService.setUserType(response.userType);
          }

          console.log(response.userType);
          console.log(response.userId);
          alert('Inicio de sesión exitoso');
          this.toggleLoginMenu();
          this.router.navigate(['/header']); // Redirige al usuario después de iniciar sesión
        } else {
          alert('Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud', error);
        alert('Ocurrió un error al iniciar sesión');
      }
    );

    /*if (this.email === 'usuario@example.com' && this.password === '123456') {
      this.isLoggedIn = true; // El usuario está logueado
      this.router.navigate(['/header']);
      alert('Credenciales correctas');
      this.toggleLoginMenu();
    } else {
      alert('Credenciales incorrectas. Por favor, intente de nuevo.');
    }*/

  }

  toggleLoginMenu() {
    this.showLoginMenu = !this.showLoginMenu;
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
      userMenu.classList.toggle('active', this.showLoginMenu);
    }
  }


  // Método para cerrar la sesión (opcional)
  logout() {
    this.isLoggedIn = false;
    this.email = '';
    this.password = '';
    this.userId = '';
    // Elimina la sesion guardada
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    //redirige a inicio
    this.router.navigate(['/home']);
  }

  editarPerfil(){
    console.log('Editar perfil');
  }
}

