import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { CondicionesServicioComponent } from './condiciones-servicio/condiciones-servicio.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';

@NgModule({
  declarations: [
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


