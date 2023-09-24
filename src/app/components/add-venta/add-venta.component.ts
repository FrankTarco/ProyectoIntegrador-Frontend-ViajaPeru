import { Component } from '@angular/core';
import { Destino } from 'src/app/models/destino.model';
import { DestinoService } from 'src/app/services/destino.service';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css']
})
export class AddVentaComponent {

  lstDestinos:Destino[] = []

  constructor(private serviceDestino:DestinoService){
    serviceDestino.listadoDestinos().subscribe(
      d => this.lstDestinos = d
    );
  }

}
