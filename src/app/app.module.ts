import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';
import { MatIconModule } from '@angular/material/icon';
import { AddVentaComponent } from './components/add-venta/add-venta.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { AddDestinoComponent } from './components/add-destino/add-destino.component';
import { AddEditBusComponent } from './dialogs/add-edit-bus/add-edit-bus.component';
import { AddConductorComponent } from './components/add-conductor/add-conductor.component';
import { AddEditConductorComponent } from './dialogs/add-edit-conductor/add-edit-conductor.component';
import { AddTerramozaComponent } from './components/add-terramoza/add-terramoza.component';
import { AddEditTerramozaComponent } from './dialogs/add-edit-terramoza/add-edit-terramoza.component';
import { AddEditDestinoComponent } from './dialogs/add-edit-destino/add-edit-destino.component';
import { AddEquipobusComponent } from './components/add-equipobus/add-equipobus.component';
import { ListChoferComponent } from './dialogs/list-chofer/list-chofer.component';
import { ListCopilotoComponent } from './dialogs/list-copiloto/list-copiloto.component';
import { ListTerramozaComponent } from './dialogs/list-terramoza/list-terramoza.component';
import { AddItinerarioComponent } from './components/add-itinerario/add-itinerario.component';
import { AddEditItinerarioComponent } from './dialogs/add-edit-itinerario/add-edit-itinerario.component';
import { ProdInterceptorService } from './interceptors/prod-interceptor.service';
import { AddLoginComponent } from './components/add-login/add-login.component';
import { AddViajesDisponiblesComponent } from './components/add-viajes-disponibles/add-viajes-disponibles.component';
import { AddSeleccionAsientosComponent } from './components/add-seleccion-asientos/add-seleccion-asientos.component';
import { AddVentaClienteComponent } from './components/add-venta-cliente/add-venta-cliente.component';
import { AddPagoClienteComponent } from './dialogs/add-pago-cliente/add-pago-cliente.component';
import { AddVentaPasajeroComponent } from './components/add-venta-pasajero/add-venta-pasajero.component';
import { AddFooterComponent } from './components/add-footer/add-footer.component';

registerLocaleData(localeES);

@NgModule({
  declarations: [
    AppComponent,
    AddVentaComponent,
    AddMenuComponent,
    AddBusComponent,
    AddDestinoComponent,
    AddEditBusComponent,
    AddConductorComponent,
    AddEditConductorComponent,
    AddTerramozaComponent,
    AddEditTerramozaComponent,
    AddEditDestinoComponent,
    AddEquipobusComponent,
    ListChoferComponent,
    ListCopilotoComponent,
    ListTerramozaComponent,
    AddItinerarioComponent,
    AddEditItinerarioComponent,
    AddLoginComponent,
    AddViajesDisponiblesComponent,
    AddSeleccionAsientosComponent,
    AddVentaClienteComponent,
    AddPagoClienteComponent,
    AddVentaPasajeroComponent,
    AddFooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    MatIconModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es'},
    { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
