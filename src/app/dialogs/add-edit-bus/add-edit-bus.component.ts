import { Component } from '@angular/core';
import { Combustible } from 'src/app/models/combustible.model';
import { Servicio } from 'src/app/models/servicio.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-edit-bus',
  templateUrl: './add-edit-bus.component.html',
  styleUrls: ['./add-edit-bus.component.css']
})
export class AddEditBusComponent {

lstCombustible:Combustible[] = []
lstServicio:Servicio[] = []

constructor(private utilService:UtilService){

  utilService.listarCombustibles().subscribe(
    c => this.lstCombustible = c
  )

  utilService.listarServicios().subscribe(
    s => this.lstServicio = s
  )
}

}
