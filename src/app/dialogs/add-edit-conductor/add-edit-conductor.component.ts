import { Component } from '@angular/core';
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
export class AddEditConductorComponent {

  lstTipo:TipoDocumento[] = []
  lstLicencia:Licencia[]=[]

objConductor: Conductor={

  cod_tipodocumento:-1,
	nrodocumento:"",
	ape_chofer:"",
	nom_chofer:"",
	cod_licencia:-1,
	nrolicencia:"",
	telefono:""
};

  
  constructor(private util:UtilService , private conductorsev:ConductorService){

util.listarTiopoDocumento().subscribe(

  a => this.lstTipo = a
)

util.listarLicencia().subscribe(

  l => this.lstLicencia = l
)

  }


  insertaConductor(){

    this.conductorsev.registraConductor(this.objConductor).subscribe(
      c => Swal.fire({icon:'info',title:'Resultado del Registro', text: c.mensaje})

     
    );

  }



}
