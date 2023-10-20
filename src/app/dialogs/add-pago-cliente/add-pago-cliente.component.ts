import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Boleto } from 'src/app/models/boleto.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { Pago } from 'src/app/models/pago.model';
import { Pasajero } from 'src/app/models/pasajero.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { Ventaboleto } from 'src/app/models/ventaboleto.model';
import { Ventarequest } from 'src/app/models/ventarequest.model';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pago-cliente',
  templateUrl: './add-pago-cliente.component.html',
  styleUrls: ['./add-pago-cliente.component.css']
})
export class AddPagoClienteComponent implements OnInit{

  objItinerario:Itinerario = JSON.parse(localStorage.getItem("itinerario")!)
  asientosSeleccionados:number[] = JSON.parse(localStorage.getItem("asientos")!)?JSON.parse(localStorage.getItem("asientos")!):[];
  total=JSON.parse(localStorage.getItem("asientos")!)?this.asientosSeleccionados.length*this.objItinerario.precio!:0.00;

  lstDocumentos:TipoDocumento[] = []


  //PRIMERO REGISTRAR VENTABOLETO
  objVentaBoleto:Ventaboleto={
    precioTotal:this.total,
    cod_itinerario:this.objItinerario.cod_itinerario
  }

  //RECIBIR PARA REGISTRAR LA LISTA DE PASAJEROS Y BOLETOS
  lstPasajeros:Pasajero[] = JSON.parse(localStorage.getItem("lstPasajeros")!)
  lstBoletos:Boleto[] = JSON.parse(localStorage.getItem("lstBoletos")!)

  //SIGUIENTE CLIENTE
  objCliente:Cliente={
    nombre:"",
    cod_tipodocumento:-1,
    numeroDocumento:"",
    email:"",
    telefono:""
  }


  //SIGUIENTE PAGO
  objPago:Pago={
    numero_tarjeta:"",
    tipo:""
  }

  ventaRequest:Ventarequest= {};

  constructor(private utilService:UtilService, private _dialog:MatDialogRef<AddPagoClienteComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:any,private transaccionService:TransaccionService,private router:Router){

    utilService.listarTiopoDocumento().subscribe(
      x => this.lstDocumentos = x
    )
  }

  ngOnInit(): void {
    this.objCliente.email=this.data.correo;
    this.objCliente.telefono=this.data.telefono;
    this.objPago.tipo = this.data.tipoPago;
  }

  concretarRegistro(){
    //CREAR LA DATA
    this.ventaRequest = {ventaBoleto:this.objVentaBoleto,
      pasajeros:this.lstPasajeros,
      boletos:this.lstBoletos,
      cliente:this.objCliente,
      pago:this.objPago
    }

    console.log(this.ventaRequest)

    this.transaccionService.registrarTransaccion(this.ventaRequest).subscribe(
      x => {
        if (x.mensaje.includes("Error")){
          Swal.fire({icon:'error',title:'Algo salio mal', text: x.mensaje})
        }
        else{
          Swal.fire({icon:'success',title:'Resultado', text: x.mensaje})
          this._dialog.close();
          //ELIMINO TODA LA DATA
          localStorage.clear();
          //PASO AL INICIO DE NUESTRO SISTEMA
          this.router.navigate(["index"]);
        }     
      }
    )
    
  }



}
