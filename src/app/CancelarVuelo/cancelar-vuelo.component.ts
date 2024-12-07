import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancelar-vuelo',
  templateUrl: './cancelar-vuelo.component.html',
  styleUrls: ['./cancelar-vuelo.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class CancelarVueloComponent {
  codigoReserva: string = '';
  fechaVuelo: string = '';
  mensaje: { text: string; success: boolean } | null = null;

  codigoReservaInvalid: boolean = false;
  fechaVueloInvalid: boolean = false;

  constructor(private fb: FormBuilder) {}

  cancelarVuelo() {
    if (!this.codigoReserva || !this.fechaVuelo) {
      this.codigoReservaInvalid = !this.codigoReserva;
      this.fechaVueloInvalid = !this.fechaVuelo;
      return;
    }

    // Simular una respuesta del servidor
    setTimeout(() => {
      this.mensaje = {
        text: 'El vuelo ha sido cancelado exitosamente.',
        success: true,
      };
    }, 1000);
  }
}
