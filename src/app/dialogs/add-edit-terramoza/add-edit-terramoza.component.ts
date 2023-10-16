import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { Terramoza } from 'src/app/models/terramoza.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { TerramozaService } from 'src/app/services/terramoza.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-terramoza',
  templateUrl: './add-edit-terramoza.component.html',
  styleUrls: ['./add-edit-terramoza.component.css']
})
export class AddEditTerramozaComponent implements OnInit{

  lstTipoDocumento:TipoDocumento[] = []

  objTerramoza:Terramoza={
    cod_terramoza:"",
    nombre:"",
    ape_mater:"",
    ape_pater:"",
    cod_tipodocumento:-1,
    numerodocumento:"",
  }

  constructor(private terramozaService:TerramozaService,private utilService:UtilService,  
    public _dialogRef:MatDialogRef<AddEditTerramozaComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any){ 

      utilService.listarTiopoDocumento().subscribe(
        x => this.lstTipoDocumento = x
      )

    }


    ngOnInit(): void {
      if(this.data){
        this.objTerramoza={
          cod_terramoza:this.data.cod_terramoza,
          nombre:this.data.nombre,
          ape_pater:this.data.ape_pater,
          ape_mater:this.data.ape_mater,
          cod_tipodocumento:this.data.cod_tipodocumento,
          numerodocumento:this.data.numerodocumento
        }
      }
    }

    registrar(){

      if (this.validarCampos() == false) {
        Swal.fire({
          icon: 'error',
          title: 'Ingrese Datos',
          text: "Todos los campos son obligatorios para el Registro",
        })
  
  
      }else{

      if(this.data){
        this.terramozaService.actualizarTerramoza(this.objTerramoza).subscribe(
          x =>{
            Swal.fire({icon:'info',title:'Resultado de la actualizacion', text: x.mensaje})
            this._dialogRef.close(true)
          }
        )
      }
      else{

        this.terramozaService.registrarTerramoza(this.objTerramoza).subscribe(
          x =>{
            Swal.fire({icon:'info',title:'Resultado del registro', text: x.mensaje})
            this._dialogRef.close(true)
      
          });
      } 
    }
    }


    validarCampos(): boolean {
      if (
     this.objTerramoza.cod_tipodocumento === -1||
     !this.objTerramoza.numerodocumento ||
     !this.objTerramoza.ape_pater  ||
     !this.objTerramoza.ape_mater ||
     !this.objTerramoza.nombre
     
   ) {


     return false;
   }
   return true;
 }

}
