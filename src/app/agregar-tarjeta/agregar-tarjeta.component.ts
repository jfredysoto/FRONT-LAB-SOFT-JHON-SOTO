import { Component, OnInit } from '@angular/core';
import { TarjetasService} from '../services/tarjeta.service';  // Asegúrate de que la ruta sea correcta
import { FormsModule, ReactiveFormsModule , Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})
export class AgregarTarjetaComponent implements OnInit {
  tarjetaForm: FormGroup;
  usuarioId: string = '3';
  
  constructor(private fb: FormBuilder, private tarjetasService: TarjetasService) {
    // Configura el formulario con validaciones
    this.tarjetaForm = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],  // Requiere 16 dígitos
      nombreTitular: ['', [Validators.required, Validators.minLength(3)]],  // Nombre mínimo de 3 caracteres
      fechaVencimiento: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]  // Requiere 3 dígitos
    });
  }

  ngOnInit(): void {}

  // Método para agregar tarjeta
  // Método para agregar tarjeta
  agregarTarjeta(): void {
    if (this.tarjetaForm.valid) {
      // Enviar los datos si el formulario es válido
      const tarjetaData = this.tarjetaForm.value;
      this.tarjetasService.agregarTarjeta(this.usuarioId, tarjetaData).subscribe(
        (response) => {
          console.log('Tarjeta agregada exitosamente', response);
          alert('Tarjeta agregada exitosamente');
        },
        (error) => {
          console.error('Tarjeta agregada exitosamente', error);
          alert('Tarjeta agregada exitosamente');
        }
      );
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
  
}
