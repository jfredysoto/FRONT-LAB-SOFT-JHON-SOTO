import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'http://localhost:5113/api'; // URL base de tu API
  private userType: number | null = null;
  private rolUsuario: string | null = null;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Método getter para obtener el valor actual de autenticación
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Método para hacer login
  login(email: string, contrasena: string): Observable<any> {
    const body = { Correo: email, Contrasena: contrasena };
    return this.http.post<any>(`${this.apiURL}/login`, body).pipe(
      tap(response => {
        if (response && response.id) {
          localStorage.setItem('userId', response.id);
          this.isLoggedInSubject.next(true);
          this.setUserType(response.userType);
          this.rolUsuario = response.role;
          localStorage.setItem('userRole', response.role);
        }
      })
    );
  }

  // Método para registrarse
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/registro`, user);
  }

  // Método para actualizar perfil
  updateProfile(id: string, profileData: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/editar-perfil?id=${id}`, profileData);
  }

  // Método para desactivar usuario, enviando el tipo de usuario al backend
  desactivarUsuario(userId: string): Observable<any> {
    const url = `${this.apiURL}/desactivar-usuario?id=${userId}`;
    return this.http.patch(url, {});
  }

  // Método para cerrar sesión y limpiar datos
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    this.isLoggedInSubject.next(false);
    this.userType = null;
    this.rolUsuario = null;
  }

  // Métodos de rol y tipo de usuario
  setUserType(userType: number): void {
    this.userType = userType;
    localStorage.setItem('userType', userType.toString());
  }

  getUserType(): number | null {
    const storedUserType = localStorage.getItem('userType');
    return storedUserType ? parseInt(storedUserType, 10) : null;
  }

  isRoot(): boolean {
    return this.getUserType() === 1;
  }

  isAdmin(): boolean {
    return this.getUserType() === 2;
  }

  isClient(): boolean {
    return this.getUserType() === 3;
  }

  getUserRole(): string | null {
    if (!this.rolUsuario) {
      this.rolUsuario = localStorage.getItem('userRole');
    }
    return this.rolUsuario;
  }

  getUserId(): string | null {
    return localStorage.getItem('userId'); // Obtén el ID del usuario desde el localStorage
  }
  

  // Método para obtener todos los administradores
  getAdministradores(): Observable<any> {
    return this.http.get(`${this.apiURL}/usuarios/obtener-todos`);
  }

  // Método para crear un administrador con manejo de archivo de imagen
  crearAdministrador(datosAdmin: any): Observable<any> {
    const formData = new FormData();

    // Añadir cada campo del administrador a FormData
    formData.append('dni', datosAdmin.dni);
    formData.append('nombres', datosAdmin.nombres);
    formData.append('apellidos', datosAdmin.apellidos);
    formData.append('fechaNacimiento', datosAdmin.fechaNacimiento);
    formData.append('lugarNacimiento', datosAdmin.lugarNacimiento);
    formData.append('direccionFacturacion', datosAdmin.direccionFacturacion);
    formData.append('genero', datosAdmin.genero);
    formData.append('correo', datosAdmin.correo);
    formData.append('usuario', datosAdmin.usuario);
    formData.append('contrasena', datosAdmin.contrasena);
    formData.append('notis', String(datosAdmin.notis));
    formData.append('idTipo', String(datosAdmin.idTipo));
    
    // Añadir el archivo de imagen si está presente
    if (datosAdmin.imagen) {
      formData.append('imagen', datosAdmin.imagen, datosAdmin.imagen.name);
    }

    return this.http.post(`${this.apiURL}/usuarios`, formData);
  }

  eliminarAdministrador(adminId: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/administradores/${adminId}`);
  }

  modificarAdministrador(adminId: number, datosActualizados: any): Observable<any> {
    return this.http.patch(`${this.apiURL}/editar-perfil/${adminId}`, datosActualizados);
  }

  obtenerVueloPorId(vueloId: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/vuelos/${vueloId}`);
  }

  editarVuelo(vueloId: number, datosVuelo: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/vuelos/${vueloId}`, datosVuelo);
  }

}



