import { Component, OnInit, ViewChild } from '@angular/core';
import { CancelarVueloComponent } from '../cancelar-vuelo/cancelar-vuelo.component';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.scss']
})
export class VuelosComponent implements OnInit {
  vuelos = [
    // Ejemplo de lista de vuelos
    { id: 1, nombre: 'Vuelo 1', estado: 'Pendiente' },
    { id: 2, nombre: 'Vuelo 2', estado: 'Pendiente' },
    // Agrega más vuelos aquí
  ];

  vueloIdParaCancelar: number | null = null; // Para almacenar el ID del vuelo a cancelar

  @ViewChild(CancelarVueloComponent) cancelarVueloComponent!: CancelarVueloComponent;

  constructor() {}

  ngOnInit(): void {}

  abrirModalCancelarVuelo(vueloId: number) {
    this.vueloIdParaCancelar = vueloId;
    this.cancelarVueloComponent.abrirModal();
  }
}
