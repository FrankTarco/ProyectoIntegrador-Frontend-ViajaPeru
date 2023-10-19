import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { Combustible } from 'src/app/models/combustible.model';
import { Servicio } from 'src/app/models/servicio.model';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-bus',
  templateUrl: './add-edit-bus.component.html',
  styleUrls: ['./add-edit-bus.component.css']
})
export class AddEditBusComponent implements OnInit {


  public currentYear: number = new Date().getFullYear();

  lstCombustible: Combustible[] = []
  lstServicio: Servicio[] = []


  objBus: Bus = {
    cod_bus: '',
    placa: '',
    marca: '',
    total_asientos:50 ,
    total_pasajeros: 50,
    fabricacion: 2011,
    cantidad_ruedas: 4,
    cod_combustible: -1,
    cod_servicio: -1,
    estado: 1
  }


  formRegistra = this.formBuilder.group({
    validaPlaca: ['',[Validators.required, Validators.pattern('[A-Z0-9Ñ]{3}-[A-Z0-9Ñ]{3}')]],
    validaMarca: ['',[Validators.required, Validators.pattern('[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ ]{2,20}')]],
    validaTotalAsientos: ['',[Validators.required, Validators.min(40), Validators.max(80)]],
    validaTotalPasajeros: ['',[Validators.required, Validators.min(37), Validators.max(77)]],
    validaAnioFabricacion: ['',[Validators.required, Validators.min(2010), Validators.max(this.currentYear)]],
    validaCantidadRuedas: ['',[Validators.required, Validators.pattern('[02468]|10|12|14|16|18'), Validators.min(4),Validators.max(16)]],
    validaCombustible: ['',[Validators.min(1)]],
    validaServicio: ['',[Validators.min(1)]],
    validaEstado: ['',[Validators.min(0)]]
  })


  constructor(private utilService: UtilService, private busService: BusService,
    private _dialog: MatDialogRef<AddEditBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder:FormBuilder) {

    utilService.listarCombustibles().subscribe(
      c => this.lstCombustible = c
    )

    utilService.listarServicios().subscribe(
      s => this.lstServicio = s
    )

  }

  ngOnInit(): void {

    if (this.data) {
      this.objBus = {
        cod_bus: this.data.cod_bus,
        placa: this.data.placa,
        marca: this.data.marca,
        total_asientos: this.data.total_asientos,
        total_pasajeros: this.data.total_pasajeros,
        fabricacion: this.data.fabricacion,
        cantidad_ruedas: this.data.cantidad_ruedas,
        cod_combustible: this.data.cod_combustible,
        cod_servicio: this.data.cod_servicio,
        estado: this.data.estado
      }
    }
  }

  agregarGuion() {
    this.objBus.placa = this.objBus.placa?.replace(/-/g, '');

    if (this.objBus.placa?.length! >= 3) {
      this.objBus.placa = this.objBus.placa?.slice(0, 3) + '-' + this.objBus.placa?.slice(3)
    }
  }


  registrar() {
    
    if(!this.formRegistra.valid){
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      })
    }

    else{

      if (this.data) {
        this.busService.actualizarBus(this.objBus).subscribe(
          x => {
            if(x.mensaje.includes("Error")){
              Swal.fire({ icon: 'error', title: 'Algo salio mal', text: x.mensaje })
            }
            else{
              Swal.fire({ icon: 'success', title: 'Resultado de la actualizacion', text: x.mensaje })
              this._dialog.close(true)
            }     
          }
        )

      } else {
        this.busService.registrarBus(this.objBus).subscribe(
          x => {
            if(x.mensaje.includes("Error")){
              Swal.fire({ icon: 'error', title: 'Algo salio mal', text: x.mensaje })
            }
            else{
              Swal.fire({ icon: 'info', title: 'Resultado del registro', text: x.mensaje })
              this._dialog.close(true)
            }
          }
        )
      }
    }   
  }


}