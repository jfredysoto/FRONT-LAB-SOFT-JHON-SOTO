export interface Vuelo {
  id: number;
  fechaVuelo: string; // O `Date` si se está manejando como `Date` en Angular
  horaVuelo: string; // O `Time` si tienes un tipo de tiempo específico
  origen: string;
  destino: string;
  tiempoDeVuelo: string; // O `Time` si es necesario
  idTipoVuelo: number;
  fechaLlegada: string; // O `Date`
  horaLlegada: string; // O `Time`
  costoPorPersona: number;
  estado: number;
}

  
  