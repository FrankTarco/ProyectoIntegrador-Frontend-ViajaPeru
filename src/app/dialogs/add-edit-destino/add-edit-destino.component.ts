import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destino } from 'src/app/models/destino.model';
import { DestinoService } from 'src/app/services/destino.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-destino',
  templateUrl: './add-edit-destino.component.html',
  styleUrls: ['./add-edit-destino.component.css']
})
export class AddEditDestinoComponent implements OnInit{


  objDestino:Destino={
    cod_destino:"",
    nombre:"",
    sucursal:"",
    ubicacion:"",
    estado:1
  }

  
  constructor(private destinoService:DestinoService,public _dialog:MatDialogRef<AddEditDestinoComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any){  }


    ngOnInit(): void {
      if(this.data){
        this.objDestino={
          cod_destino:this.data.cod_destino,
          nombre:this.data.nombre,
          sucursal:this.data.sucursal,
          ubicacion:this.data.ubicacion,
          estado:this.data.estado
        }
      }
    }

    registrarDestino(){

      if(this.data){

        this.destinoService.actualizarDestino(this.objDestino).subscribe(
          d => {
            Swal.fire({icon:'info',title:'Resultado de la actualizacion', text: d.mensaje})
            this._dialog.close(true)
          }
        )

      }else{
        this.destinoService.registrarDestino(this.objDestino).subscribe(
          d => {
            Swal.fire({icon:'info',title:'Resultado del Registro', text: d.mensaje})
            this._dialog.close(true)
          }
        )
      }


      

    }


}
