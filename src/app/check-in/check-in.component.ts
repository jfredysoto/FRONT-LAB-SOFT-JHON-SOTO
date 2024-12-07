import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio de autenticación si lo necesitas
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule para usar directivas como ngIf
import { FormsModule } from '@angular/forms'; // Importa el módulo FormsModule para trabajar con formularios
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CheckInComponent implements OnInit {
  // Propiedades para almacenar los datos ingresados
  codigoReserva: string = '';
  documento: string = '';

  // Simulamos la validación del formulario
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Si el cliente está autenticado, se autocompleta el formulario
    if (this.authService.isLoggedIn) {
      this.autocompletarFormulario();
    }
  }

  // Método para autocompletar los campos si el cliente está autenticado
  autocompletarFormulario(): void {
    // Suponemos que 'this.authService' tiene los datos del usuario logueado
    this.documento = this.authService.getUserRole() === 'Cliente' ? 'Documento del Cliente' : '';
    // Autocompletar también el código de reserva si es necesario
  }

  // Método que maneja la acción de submit del formulario
  onSubmit(): void {
    // Aquí iría la lógica para hacer el Check-in (validación, confirmación, etc.)
    console.log('Check-in realizado para la reserva:', this.codigoReserva, 'Documento:', this.documento);
    // Simular envío de email con el pasabordo en formato PDF
  }

  // Método para cancelar el check-in (si es necesario)
  cancelCheckin(): void {
    console.log('Check-in cancelado');
    // Aquí iría la lógica para cancelar el proceso de check-in
  }
}
