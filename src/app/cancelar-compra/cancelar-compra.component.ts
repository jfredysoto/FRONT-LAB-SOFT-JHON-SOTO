import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VuelosService } from '../services/vuelos/vuelos.service';  // Asegúrate de tener este servicio
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cancelar-compra',
  templateUrl: './cancelar-compra.component.html',
  styleUrls: ['./cancelar-compra.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CancelarCompraComponent implements OnInit {
  vueloId: number | null = null;
  vuelo: any = null;
  tiempoRestante: number = 0; // Tiempo restante en minutos para poder cancelar
  puedeCancelar: boolean = false; // Si puede o no cancelar la compra

  constructor(
    private route: ActivatedRoute,
    private vuelosService: VuelosService // Asegúrate de tener este servicio correctamente
  ) {}

  ngOnInit(): void {
    // Obtén el id del vuelo desde la ruta
    this.vueloId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.vueloId) {
      this.obtenerVuelo();
    }
  }

  obtenerVuelo(): void {
    this.vuelosService.obtenerVueloPorId(this.vueloId!).subscribe(
      (vuelo) => {
        this.vuelo = vuelo;
        this.verificarCancelacion();
      },
      (error) => {
        console.error('Error al obtener el vuelo', error);
      }
    );
  }

  verificarCancelacion(): void {
    // Calculamos la diferencia de tiempo entre la hora actual y la hora del vuelo
    const fechaVuelo = new Date(this.vuelo.fechaVuelo + ' ' + this.vuelo.horaVuelo);
    const ahora = new Date();
    const diferencia = (fechaVuelo.getTime() - ahora.getTime()) / (1000 * 60); // En minutos

    this.tiempoRestante = diferencia;
    this.puedeCancelar = diferencia >= 60; // Puede cancelar si hay una hora o más
  }

  cancelarCompra(): void {
    if (this.puedeCancelar) {
      // Lógica para procesar la cancelación y el reembolso
      // Aquí debes hacer la llamada al backend para cancelar la compra y reembolsar
      this.vuelosService.cancelarCompra(this.vueloId!).subscribe(
        (response) => {
          alert('Compra cancelada exitosamente y se ha procesado el reembolso');
        },
        (error) => {
          console.error('Error al cancelar la compra', error);
        }
      );
    } else {
      alert('No se puede cancelar la compra, ya que el vuelo es dentro de menos de una hora.');
    }
  }
}

