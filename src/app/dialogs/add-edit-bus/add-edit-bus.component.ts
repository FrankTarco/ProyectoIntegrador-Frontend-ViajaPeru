import { Component, Inject, OnInit } from '@angular/core';
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
export class AddEditBusComponent implements OnInit{

lstCombustible:Combustible[] = []
lstServicio:Servicio[] = []

objBus:Bus={
  cod_bus:"",
  placa:"",
  marca:"",
  total_asientos:0,
  total_pasajeros:0,
  fabricacion:0,
  cantidad_ruedas:0,
  cod_combustible:-1,
  cod_servicio:-1,
  estado:1
}

constructor(private utilService:UtilService,private busService:BusService, 
  private _dialog: MatDialogRef<AddEditBusComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){

  utilService.listarCombustibles().subscribe(
    c => this.lstCombustible = c
  )

  utilService.listarServicios().subscribe(
    s => this.lstServicio = s
  )
  
}

ngOnInit(): void {

  if(this.data){
    this.objBus= {
      cod_bus:this.data.cod_bus,
      placa:this.data.placa,
      marca:this.data.marca,
      total_asientos:this.data.total_asientos,
      total_pasajeros:this.data.total_pasajeros,
      fabricacion:this.data.fabricacion,
      cantidad_ruedas:this.data.cantidad_ruedas,
      cod_combustible:this.data.cod_combustible,
      cod_servicio:this.data.cod_servicio,
      estado:this.data.estado
    }
  }  
}

agregarGuion(){
  this.objBus.placa = this.objBus.placa?.replace(/-/g, '');

  if(this.objBus.placa?.length! >= 3){
    this.objBus.placa = this.objBus.placa?.slice(0,3) + '-' + this.objBus.placa?.slice(3)
  }
}

registrar(){

  if(this.data){
    this.busService.actualizarBus(this.objBus).subscribe(
      x =>{
        Swal.fire({icon:'info',title:'Resultado de la actualizacion', text: x.mensaje})
        this._dialog.close(true)
      }
    )
        
  }else{
    this.busService.registrarBus(this.objBus).subscribe(
      x =>{
        Swal.fire({icon:'info',title:'Resultado del registro', text: x.mensaje})
        this._dialog.close(true)
  
      }
    )
  }
}

}
