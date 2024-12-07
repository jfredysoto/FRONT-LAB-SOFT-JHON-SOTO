import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import{ FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TarjetasService } from '../services/tarjeta.service';
@Component({
  selector: 'app-recargar-saldo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recargar-saldo.component.html',
  styleUrl: './recargar-saldo.component.scss'
})
export class RecargarSaldoComponent {
  recargaForm: FormGroup;
  usuarioId: string = '3';

  constructor(private fb: FormBuilder, private tarjetasService: TarjetasService) {
    // Crear el formulario con validaciones
    this.recargaForm = this.fb.group({
      moneda: [
        '', 
        [Validators.required]  // Validación de moneda (obligatoria)
      ],
      monto: [
        '', 
        [Validators.required, Validators.min(1), Validators.max(10000)]  // Validación de monto (mínimo 1 y máximo 10000)
      ]
    });
  }

  ngOnInit(): void {}

  // Método para realizar la recarga de saldo
  recargarSaldo(): void {
    if (this.recargaForm.valid) {
      const monto = this.recargaForm.get('monto')?.value;
      const moneda = this.recargaForm.get('moneda')?.value;
      
      // Llamar al servicio para recargar saldo
      this.tarjetasService.recargarSaldo(this.usuarioId, monto, moneda).subscribe(
        (response) => {
          console.log('Saldo recargado exitosamente', response);
          alert('Saldo recargado exitosamente');
        },
        (error) => {
          console.error('Error al recargar saldo', error);
          alert('Error al recargar saldo');
        }
      );
    } else {
      alert('Por favor, ingrese un monto válido y seleccione una moneda.');
    }
  }

  // Getter para acceder fácilmente a los controles del formulario
  get monto() {
    return this.recargaForm.get('monto');
  }

  get moneda() {
    return this.recargaForm.get('moneda');
  }
}
