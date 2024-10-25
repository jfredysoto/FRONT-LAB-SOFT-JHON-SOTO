import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necesario si es standalone
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarPerfilComponent {
  editarPerfilForm: FormGroup; // Formulario reactivo
  countries: string[] = [];
  regions: any[] = [];
  cities: string[] = [];

  locationData = [
    {
      country: 'Colombia',
      regions: [
        { name: 'Cundinamarca', cities: ['Bogotá', 'Chía', 'Soacha'] },
        { name: 'Antioquia', cities: ['Medellín', 'Envigado', 'Bello'] }
      ]
    },
    {
      country: 'España',
      regions: [
        { name: 'Madrid', cities: ['Madrid', 'Alcobendas', 'Getafe'] },
        { name: 'Cataluña', cities: ['Barcelona', 'Girona', 'Tarragona'] }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.editarPerfilForm = this.fb.group({
      documento: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Solo números
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]], // Solo letras
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]], // Solo letras
      correo: ['', [Validators.required, Validators.email]], // Correo electrónico válido
      country: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required], // Dirección requerida
      genero: ['', Validators.required] // Género requerido
    });

    this.countries = this.locationData.map(location => location.country); // Inicializar países
  }

  onCountryChange(event: any) {
    const selectedCountry = event.target.value;
    const countryData = this.locationData.find(country => country.country === selectedCountry);

    if (countryData) {
      this.regions = countryData.regions;
      this.cities = [];
      this.editarPerfilForm.controls['region'].setValue('');
      this.editarPerfilForm.controls['city'].setValue('');
    }
  }

  preventSpaces(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Evita que se ingresen espacios
    }
  }

  onRegionChange(event: any) {
    const selectedRegion = event.target.value;
    const regionData = this.regions.find(region => region.name === selectedRegion);

    if (regionData) {
      this.cities = regionData.cities;
      this.editarPerfilForm.controls['city'].setValue('');
    }
  }

  // Método para eliminar espacios en los campos de texto
  eliminarEspacios() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', function () {
        this.value = this.value.replace(/\s+/g, ' ').trim(); // Evita múltiples espacios y espacios al inicio o fin
      });
    });
  }

  submitForm() {
    if (this.editarPerfilForm.valid) {
      //console.log('Perfil actualizado', this.editarPerfilForm.value);
      //const id = 'id_del_usuario';
      const id = localStorage.getItem('userId');
      const profileData = this.editarPerfilForm.value;

      /*this.authService.updateProfile(id, profileData).subscribe({
        next: (response) => {
          console.log('Perfil actualizado', response);
          alert('Perfil actualizado correctamente');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error al actualizar el perfil', error);
          alert('Hubo un error al actualizar el perfil. Inténtalo de nuevo');
        }
      });*/

      if(id){
        this.authService.updateProfile(id, profileData).subscribe({
          next: (response) => {
            console.log('Perfil actualizado', response);
            alert('Perfil actualizado correctamente');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error al actualizar el perfil', error);
            alert('Hubo un error al actualizar el perfil. Inténtalo de nuevo');
          }
        });
      } else {
        console.error('No se encontró el ID del usuario.');
        alert('No se encontró el ID del usuario. Intenta iniciar sesión nuevamente.');
      }
    } else {
      console.log('Formulario inválido');
    }
  }
}









