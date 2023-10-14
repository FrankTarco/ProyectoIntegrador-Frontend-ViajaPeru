import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddPagoClienteComponent } from 'src/app/dialogs/add-pago-cliente/add-pago-cliente.component';
import { Itinerario } from 'src/app/models/itinerario.model';

@Component({
  selector: 'app-add-venta-cliente',
  templateUrl: './add-venta-cliente.component.html',
  styleUrls: ['./add-venta-cliente.component.css']
})
export class AddVentaClienteComponent {

  fontStyleControl = new FormControl('');
  fontStyle?: string;

  correoCliente:string=""

  objEnviar:any={correo:"",tipoPago:""}
  

  objItinerario:Itinerario = JSON.parse(localStorage.getItem("itinerario")!)
  asientosSeleccionados:number[] = JSON.parse(localStorage.getItem("asientos")!);
  total=JSON.parse(localStorage.getItem("asientos")!)?this.asientosSeleccionados.length*this.objItinerario.precio!:0.00;


  constructor(private dialog:MatDialog){

  }

  openDialog(){
    this.objEnviar={
      correo:this.correoCliente,
      tipoPago:this.fontStyleControl.value
    }
    let data:any = this.objEnviar
    const dialogRef = this.dialog.open(AddPagoClienteComponent, {data,})

  }

  verDataElegida(){
    this.objEnviar={
      correo:this.correoCliente,
      tipoPago:this.fontStyleControl.value
    }
    console.log(this.objEnviar)
  }

}
