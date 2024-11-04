import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cancelar-vuelo',
  templateUrl: './cancelar-vuelo.component.html',
  styleUrls: ['./cancelar-vuelo.component.scss']
})
export class CancelarVueloComponent {
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  abrirModal() {
    // Lógica para mostrar el modal, puedes añadir una clase CSS para hacerlo visible
  }

  cerrarModal() {
    this.onClose.emit();
    // Lógica para ocultar el modal
  }

  confirmarCancelacion() {
    this.onConfirm.emit();
    this.cerrarModal();
  }
}

