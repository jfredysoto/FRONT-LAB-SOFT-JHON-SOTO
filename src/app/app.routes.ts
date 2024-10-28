import { Routes } from '@angular/router';
import { EditarPerfilComponent } from './editarperfil/editar-perfil.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './Home/home.component';
import {SuperUsuarioComponent} from './superUsuario/superUsuario.component';
import { RegisterComponent } from './Register/register.component';
import { CambiarContrasenaComponent } from './CambiarContraseña/cambiar-contraseña.component';

export const routes: Routes = [
  {
    path: 'header', // Ruta principal (raíz)
    component: HeaderComponent // Componente de inicio de sesión
  },
  {
    path: 'home', // Nueva ruta para el componente Home
    component: HomeComponent
  },
  {
    path: 'editar-perfil', 
    component: EditarPerfilComponent // Componente standalone
  },
  {
  path: 'register',
  loadComponent: () => import('./Register/register.component').then(m => m.RegisterComponent), // Importa el componente de manera dinámica
  },
  {
  path: 'condiciones-servicio',
      loadComponent: () => import('./condiciones-servicio/condiciones-servicio.component').then(m => m.CondicionesServicioComponent), // Importa el componente de manera dinámica
  },
  {
    path: 'super-usuario', // Ruta del componente
    component: SuperUsuarioComponent // Componente standalone
  },
  {
    path: 'cambiar-contrasena', // Ruta del componente
    component: CambiarContrasenaComponent // Componente standalone
  },
  {
  path: 'politica-privacidad',
  loadComponent: () => import('./politica-privacidad/politica-privacidad.component').then(m => m.PoliticaPrivacidadComponent), // Importa el componente de manera dinámica
  },
  {
    path: '', // Ruta por defecto (redirección a la página Home)
    redirectTo: 'home',
    pathMatch: 'full'
  }

];



