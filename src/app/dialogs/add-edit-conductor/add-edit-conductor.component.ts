import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Conductor } from 'src/app/models/conductor.model';
import { Licencia } from 'src/app/models/licencia.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';

import { ConductorService } from 'src/app/services/conductor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-edit-conductor',
  templateUrl: './add-edit-conductor.component.html',
  styleUrls: ['./add-edit-conductor.component.css']
})
export class AddEditConductorComponent implements OnInit{

  lstTipo:TipoDocumento[] = []
  lstLicencia:Licencia[]=[]

objConductor: Conductor={

  cod_conductor:"",
  cod_tipodocumento:-1,
	nrodocumento:"",
	ape_chofer:"",
	nom_chofer:"",
	cod_licencia:-1,
	nrolicencia:"",
	telefono:""
};

  

constructor(private util:UtilService , private conductorsev:ConductorService, 
  private _dialog:MatDialogRef<AddEditConductorComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){

util.listarTiopoDocumento().subscribe(

  a => this.lstTipo = a
)

util.listarLicencia().subscribe(

  l => this.lstLicencia = l
)

  }

  ngOnInit(): void {
    if(this.data){
      this.objConductor={
        cod_conductor:this.data.cod_conductor,
        cod_tipodocumento:this.data.cod_tipodocumento,
        nrodocumento:this.data.nrodocumento,
        ape_chofer:this.data.ape_chofer,
        nom_chofer:this.data.nom_chofer,
        cod_licencia:this.data.cod_licencia,
        nrolicencia:this.data.nrolicencia,
        telefono:this.data.telefono
      }
    }
  }

  insertaConductor(){

    if(this.data){
      this.conductorsev.actualizarConductor(this.objConductor).subscribe(
        c => {
          Swal.fire({icon:'info',title:'Resultado del Registro', text: c.mensaje})
          this._dialog.close(true)
        }
      )
    }

    else{
      this.conductorsev.registraConductor(this.objConductor).subscribe(
        c => {
          Swal.fire({icon:'info',title:'Resultado del Registro', text: c.mensaje})
          this._dialog.close(true)
        } );
    }

  }

}
