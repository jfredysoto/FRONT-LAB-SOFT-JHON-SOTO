import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CrearVueloComponent } from './CrearVuelo/crear-vuelo.component';
import { AppComponent } from './app.component';
import { CondicionesServicioComponent } from './condiciones-servicio/condiciones-servicio.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';

@NgModule({
  declarations: [
    CrearVueloComponent,
    AppComponent,
    RegisterComponent,
    CondicionesServicioComponent, // Declarar CondicionesServicioComponent
    PoliticaPrivacidadComponent  // Declarar PoliticaPrivacidadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule // Asegúrate de que FormsModule esté importado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


