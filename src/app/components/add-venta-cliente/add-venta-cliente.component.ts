import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddPagoClienteComponent } from 'src/app/dialogs/add-pago-cliente/add-pago-cliente.component';
import { Itinerario } from 'src/app/models/itinerario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-venta-cliente',
  templateUrl: './add-venta-cliente.component.html',
  styleUrls: ['./add-venta-cliente.component.css']
})
export class AddVentaClienteComponent {

  checkMarcado = false;

  fontStyleControl = new FormControl('');
  fontStyle?: string;

  correoCliente:string=""
  telefono:String=""

  objEnviar:any={correo:"",tipoPago:"",telefono:""}
  

  objItinerario:Itinerario = JSON.parse(localStorage.getItem("itinerario")!)
  asientosSeleccionados:number[] = JSON.parse(localStorage.getItem("asientos")!);
  total=JSON.parse(localStorage.getItem("asientos")!)?this.asientosSeleccionados.length*this.objItinerario.precio!:0.00;

  formEnviar = this.formBuilder.group({
    validMail: ['',[Validators.required,Validators.pattern('[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})')]],
    validFono: ['',[Validators.required,Validators.pattern('[9][0-9]{8}')]] 
  })

  constructor(private dialog:MatDialog, private formBuilder:FormBuilder){

  }

  openDialog(){

    if(!this.formEnviar.valid){
      Swal.fire({ icon: 'error', title: 'Obligatorio', text: "Debe completar sus datos"})
    }
    else if(this.fontStyleControl.value === ''){
      Swal.fire({ icon: 'error', title: 'Obligatorio', text: "Debe elegir el tipo de pago"})
    }
    else{
      this.objEnviar={
        correo:this.correoCliente,
        tipoPago:this.fontStyleControl.value,
        telefono:this.telefono
      }
      let data:any = this.objEnviar
      const dialogRef = this.dialog.open(AddPagoClienteComponent, {data,})
    }  

  }

  verDataElegida(){
    this.objEnviar={
      correo:this.correoCliente,
      tipoPago:this.fontStyleControl.value
    }
    console.log(this.objEnviar)
  }

  checkboxChange(){
    this.checkMarcado = !this.checkMarcado;
  }

}
