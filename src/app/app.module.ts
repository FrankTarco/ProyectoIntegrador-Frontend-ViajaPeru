import { NgModule } from '@angular/core';
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
    AddEditTerramozaComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
