import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVentaComponent } from './components/add-venta/add-venta.component';
import { AddLoginComponent } from './components/add-login/add-login.component';
import { AddDestinoComponent } from './components/add-destino/add-destino.component';
import { AddIndexComponent } from './components/add-index/add-index.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { AddViajesDisponiblesComponent } from './components/add-viajes-disponibles/add-viajes-disponibles.component';
import { AddSeleccionAsientosComponent } from './components/add-seleccion-asientos/add-seleccion-asientos.component';

const routes: Routes = [
{path:"index",component:AddVentaComponent},
{path:"",component:AddIndexComponent},
{path:"destino",component:AddDestinoComponent},
{path:"login",component:AddLoginComponent},
{path:"verBus",component:AddBusComponent},
{path:"app", component:AddMenuComponent},
{path:"viajes", component:AddViajesDisponiblesComponent},
{path:"asientoselect", component:AddSeleccionAsientosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
