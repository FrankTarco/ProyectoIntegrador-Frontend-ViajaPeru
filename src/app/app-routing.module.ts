import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVentaComponent } from './components/add-venta/add-venta.component';
import { AddLoginComponent } from './components/add-login/add-login.component';
import { AddDestinoComponent } from './components/add-destino/add-destino.component';
import { AddIndexComponent } from './components/add-index/add-index.component';

const routes: Routes = [
{path:"index",component:AddVentaComponent},
{path:"",component:AddIndexComponent},
{path:"destino",component:AddDestinoComponent},
{path:"login",component:AddLoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
