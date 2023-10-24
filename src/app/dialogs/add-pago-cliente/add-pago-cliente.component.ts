import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  formRegistro: FormGroup;

  documentMessage = {
    required:'',
    pattern:''
  }


  constructor(private utilService:UtilService, private _dialog:MatDialogRef<AddPagoClienteComponent>, 
    @Inject(MAT_DIALOG_DATA)public data:any,private transaccionService:TransaccionService,private router:Router,
    private formBuilder:FormBuilder){

    utilService.listarTiopoDocumento().subscribe(
      x => this.lstDocumentos = x
    )

    this.formRegistro = this.formBuilder.group({
      valTarjeta: ['',[Validators.required,Validators.pattern(/^(?!0{16}$)\d{16}$/)]],
      valMes: ['',[Validators.required]],
      valCvv: ['',[Validators.required,Validators.pattern(/^(?!0{3}$)\d{3}$/)]],
      valTipo: ['',[Validators.min(1)]],
      valDocumento: [{value:'', disabled:true},[Validators.required]],
      valNombre: [{value:'', disabled:false},[Validators.required,Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ. ]{3,40}')]]
    })

    this.formRegistro.get('valTipo')!.valueChanges.subscribe((tipo: number) => {
      this.actualizarValidadorDocumento(tipo);
    });

  }

  private actualizarValidadorDocumento(tipo: number): void {
    this.formRegistro.get('valDocumento')!.clearValidators();

    if (tipo === 1) {
      this.formRegistro.get('valDocumento')!.setValidators([Validators.required,Validators.pattern(/^(?!0{8}$)\d{8}$/)]);
      this.formRegistro.get('valDocumento')!.enable();
      this.documentMessage.required = 'El DNI es obligatorio'
      this.documentMessage.pattern = 'Debe tener 8 digitos'
    }
    else if(tipo === 2){
      this.formRegistro.get('valDocumento')!.setValidators([Validators.required,Validators.pattern(/^(?!0{12}$)\d{12}$/)]);
      this.formRegistro.get('valDocumento')!.enable();
      this.documentMessage.required = 'El C.E.X es obligatorio'
      this.documentMessage.pattern = 'Debe tener 12 digitos'
    }
    else if(tipo === 3){
      this.formRegistro.get('valDocumento')!.setValidators([Validators.required,Validators.pattern(/^[A-Z]{2}(?!000000)\d{6}$/)]);
      this.formRegistro.get('valDocumento')!.enable();
      this.documentMessage.required = 'El pasaporte es obligatorio'
      this.documentMessage.pattern = 'Ejemplo: AA000000'
    }
    else if(tipo === 4){
      this.formRegistro.get('valDocumento')!.setValidators([Validators.required,Validators.pattern(/^(?!0{11}$)\d{11}$/)]);
      this.formRegistro.get('valDocumento')!.enable();
      this.documentMessage.required = 'El RUC es obligatorio'
      this.documentMessage.pattern = 'Debe tener 11 digitos'
    }
    else{
      this.formRegistro.get('valDocumento')!.disable();
      this.objCliente.numeroDocumento = ''
    }

    this.formRegistro.get('valDocumento')!.updateValueAndValidity();
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
          this.getPdf();
          this.enviarCorreo();

          //PASO AL INICIO DE NUESTRO SISTEMA
          this.router.navigate(["index"]);
        }     
      }
    )
    
  }

  clienteEncontrado(){

    if(this.objCliente.numeroDocumento === ''){

    }
    else{
      this.transaccionService.encontrarCliente(this.objCliente.numeroDocumento!).subscribe(
        x =>{
           if(x === null){
            this.objCliente.nombre = ""
            this.formRegistro.get('valNombre')!.enable();
            //this.inputBloq.razonSocial = false
           }
           else{
            this.objCliente.nombre = x.nombre
            this.formRegistro.get('valNombre')!.disable();
            //this.inputBloq.razonSocial = true
           }
        }
      )
    }

  }


  getPdf(){
    this.transaccionService.generarListaPdf().subscribe(
      (data)=>{
        let download = window.URL.createObjectURL(data)
        let link = document.createElement('a')
        link.href=download
        link.download="cdp.pdf"
        link.click()
      }
    )
  }

  enviarCorreo(){
    this.transaccionService.enviarCorreo(this.objCliente.email!).subscribe(
      ()=>{
        console.log('Correo enviado correctamente');
      },
      (error) => {
        console.error('Error al enviar el correo', error);
      }
    );
  }


}
