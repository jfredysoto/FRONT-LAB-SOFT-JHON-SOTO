import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-vuelo',
  templateUrl: './editar-vuelo.component.html',
  styleUrls: ['./editar-vuelo.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarVueloComponent implements OnInit {
  vueloForm!: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  vueloId!: number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vueloForm = this.fb.group({
      tipoVuelo: ['', Validators.required],
      fechaVuelo: ['', Validators.required],
      horaVuelo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.vueloId = +params['id'];
      this.cargarDatosVuelo(this.vueloId);
    });
  }

  cargarDatosVuelo(vueloId: number): void {
    this.authService.obtenerVueloPorId(vueloId).subscribe(
      (vuelo: any) => {
        this.vueloForm.patchValue(vuelo);
      },
      (error: any) => {
        this.mensajeError = 'Error al cargar los datos del vuelo';
      }
    );
  }

  editarVuelo(): void {
    if (this.vueloForm.valid) {
      this.authService.editarVuelo(this.vueloId, this.vueloForm.value).subscribe(
        (response: any) => {
          this.mensajeExito = 'Edición exitosa';
          setTimeout(() => {
            this.router.navigate(['/gestionar-vuelos']);
          }, 2000);
        },
        (error: any) => {
          this.mensajeError = 'Error al editar el vuelo. Inténtalo nuevamente.';
        }
      );
    } else {
      this.mensajeError = 'Por favor, complete todos los campos requeridos';
    }
  }
}

