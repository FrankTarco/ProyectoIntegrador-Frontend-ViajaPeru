import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditItinerarioComponent } from 'src/app/dialogs/add-edit-itinerario/add-edit-itinerario.component';
import { Equipobus } from 'src/app/models/equipobus.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { EquipobusService } from 'src/app/services/equipobus.service';

@Component({
  selector: 'app-add-itinerario',
  templateUrl: './add-itinerario.component.html',
  styleUrls: ['./add-itinerario.component.css']
})
export class AddItinerarioComponent {


  constructor(private equipoBus:EquipobusService,private dialog:MatDialog){

  }

openDialog(){
this.dialog.open(AddEditItinerarioComponent)
}

}
