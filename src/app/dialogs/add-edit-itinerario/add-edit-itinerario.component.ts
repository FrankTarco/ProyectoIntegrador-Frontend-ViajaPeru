import { Component, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Bus } from 'src/app/models/bus.model';
import { Destino } from 'src/app/models/destino.model';
import { Equipobus } from 'src/app/models/equipobus.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { BusService } from 'src/app/services/bus.service';
import { DestinoService } from 'src/app/services/destino.service';
import { EquipobusService } from 'src/app/services/equipobus.service';

@Component({
  selector: 'app-add-edit-itinerario',
  templateUrl: './add-edit-itinerario.component.html',
  styleUrls: ['./add-edit-itinerario.component.css']
})
export class AddEditItinerarioComponent {

  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel | undefined;

  lstEquipos:Equipobus[] = []
  lstDestinos:Destino[]=[]
  lstBuses:Bus[] = []

objItinerario:Itinerario={
  codequipo:""
}

  constructor(private equipoBus:EquipobusService,private destinoService:DestinoService,private busService:BusService){

    equipoBus.listarEquipos().subscribe(
      x => this.lstEquipos = x
    )

    destinoService.listadoDestinos().subscribe(
      d => this.lstDestinos = d
    )

    busService.listarBuses().subscribe(
      b => this.lstBuses = b
    )

  }

  teamSelect(codigo:string){
    this.objItinerario.codequipo=codigo
    this.panel?.close();
  }


}
