import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-seleccionar-silla',
  templateUrl: './seleccionar-silla.component.html',
  styleUrls: ['./seleccionar-silla.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SeleccionarSillaComponent implements OnInit {
  capacidad: number = 0;
  primeraClase: number = 0;
  claseEconomica: number = 0;
  sillas: boolean[] = [];
  sillaSeleccionada: number | null = null;
  sillaOriginal: number | null = null;
  vueloTipo: string = 'nacional'; // Puede ser 'nacional' o 'internacional'
  yaHizoCheckIn: boolean = false;

  ngOnInit(): void {
    this.iniciarSillas();
  }

  // Inicializamos las sillas
  iniciarSillas() {
    if (this.vueloTipo === 'nacional') {
      this.capacidad = 150;
      this.primeraClase = 25;
    } else if (this.vueloTipo === 'internacional') {
      this.capacidad = 250;
      this.primeraClase = 50;
    }

    this.claseEconomica = this.capacidad - this.primeraClase;

    // Inicializamos las sillas, todas disponibles (false)
    this.sillas = new Array(this.capacidad).fill(false);

    // Asignamos una silla aleatoriamente
    this.asignarSillaAleatoria();
  }

  // Función para asignar una silla aleatoriamente
  asignarSillaAleatoria() {
    let sillaAleatoria = Math.floor(Math.random() * this.capacidad);
    while (this.sillas[sillaAleatoria]) {
      sillaAleatoria = Math.floor(Math.random() * this.capacidad);
    }
    this.sillas[sillaAleatoria] = true;
    this.sillaSeleccionada = sillaAleatoria;
    this.sillaOriginal = sillaAleatoria;
  }

  // Función para cambiar la silla (solo se puede cambiar una vez antes del check-in)
  cambiarSilla(silla: number) {
    if (!this.yaHizoCheckIn && this.sillaSeleccionada !== silla) {
      this.sillas[this.sillaSeleccionada!] = false;  // Liberamos la silla anterior
      this.sillas[silla] = true;  // Asignamos la nueva silla
      this.sillaSeleccionada = silla;
    }
  }

  // Función para confirmar la silla seleccionada
  confirmarSilla() {
    if (this.sillaSeleccionada !== null) {
      this.yaHizoCheckIn = true;  // Se hace el check-in
    }
  }
}
