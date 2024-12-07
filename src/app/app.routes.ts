import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { EditarPerfilComponent } from './editarperfil/editar-perfil.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './Home/home.component';
import { RegisterComponent } from './Register/register.component';
import { CambiarContrasenaComponent } from './CambiarContraseña/cambiar-contraseña.component';
import { SuperUsuarioComponent } from './superUsuario/superUsuario.component';
import { AutenticacionGuard} from './protecciones/autenticacion.guard';
import { RolGuard } from './protecciones/rol.guard';
import { CrearVueloComponent} from './CrearVuelo/crear-vuelo.component';
import { AutenticacionAdminGuard } from './AuthGuard/auth.guard';
import { EditarVueloComponent } from './EditarVuelo/editar-vuelo.component';
import { CancelarVueloComponent } from './CancelarVuelo/cancelar-vuelo.component';
import { AgregarTarjetaComponent } from './agregar-tarjeta/agregar-tarjeta.component';
import { RecargarSaldoComponent } from './recargar-saldo/recargar-saldo.component';
import { ReservasComponent } from './reservas/reservas.component';
import { SeleccionarSillaComponent } from './seleccionar-silla/seleccionar-silla.component';
import { CancelarCompraComponent } from './cancelar-compra/cancelar-compra.component';
import { CheckInComponent } from './check-in/check-in.component';
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
    component: SuperUsuarioComponent, // Componente standalone
    canActivate: [AutenticacionGuard, RolGuard],
    data: { rolEsperado: 'Root' } // Solo accesible para usuarios con rol Root 
  },
  {
    path: 'crear-vuelo', // Ruta del componente
    component: CrearVueloComponent, // Componente standalone
    canActivate: [AutenticacionAdminGuard], // Protegido por autenticación
    data: { rolEsperado: 'Admin' } // Solo accesible para usuarios con rol Admin
  },
  {
    path: 'editar-vuelo/:id', component: EditarVueloComponent, canActivate: [AutenticacionAdminGuard] // Solo accesible para administradores autenticados
  },
  {
    path: 'cancelar-vuelo',
    component: CancelarVueloComponent,
    canActivate: [AutenticacionAdminGuard] // Asegúrate de que solo los administradores puedan acceder
  },
  {
    path: 'agregar-tarjeta',
    component: AgregarTarjetaComponent,
    canActivate: [AutenticacionGuard], // Solo usuarios logueados
    data: { rolEsperado: 'Cliente' } // Solo accesible para usuarios con rol Cliente
  },
  {
    path: 'recargar-saldo',
    component: RecargarSaldoComponent,
    canActivate: [AutenticacionGuard], // Solo usuarios logueados
    data: { rolEsperado: 'Cliente' } // Solo accesible para usuarios con rol Cliente
  },
  {
    path: 'reservas',
    component: ReservasComponent,
    canActivate: [AutenticacionGuard], // Solo usuarios logueados
    data: { rolEsperado: 'Cliente' } // Solo accesible para usuarios con rol Cliente
    },
    {
      path: 'seleccionar-asientos',
      component: SeleccionarSillaComponent,
      canActivate: [AutenticacionGuard], // Solo usuarios logueados
      data: { rolEsperado: 'Cliente' } // Solo accesible para usuarios con
    },
    {
      path: 'cancelar-compra',
      component: CancelarCompraComponent,
      canActivate: [AutenticacionAdminGuard], // Solo accesible para administradores autenticados
      data : {rolEsperado: 'Cliente'}
    },
    {
      path: 'check-in',
      component: CheckInComponent,
      canActivate: [AutenticacionGuard], // Solo usuarios logueados
      data: { rolEsperado: 'Cliente' } // Solo accesible para usuarios con rol Cliente
      },
  {
    path: 'cambiar-contrasena', // Ruta del componente
    component: CambiarContrasenaComponent, // Componente standalone
    canActivate: [AutenticacionGuard] // Protegido por autenticación
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



