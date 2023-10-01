import { Component } from '@angular/core';
import { Licencia } from 'src/app/models/licencia.model';
import { TipoDocumento } from 'src/app/models/tipo-documento.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-edit-conductor',
  templateUrl: './add-edit-conductor.component.html',
  styleUrls: ['./add-edit-conductor.component.css']
})
export class AddEditConductorComponent {

  lstTipo:TipoDocumento[] = []
  lstLicencia:Licencia[]=[]
  
  constructor(private util:UtilService){

util.listarTiopoDocumento().subscribe(

  a => this.lstTipo = a
)

util.listarLicencia().subscribe(

  l => this.lstLicencia = l
)

  }

}
