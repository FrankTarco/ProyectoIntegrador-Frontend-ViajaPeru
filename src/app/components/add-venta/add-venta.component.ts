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

  cambioSelect(selectedValue: string): void {
    // Realiza acciones basadas en el valor seleccionado
    if (selectedValue === '-1') {
      // El usuario seleccionó la opción [Seleccione]
      console.log('Ningún destino seleccionado.');
    } else {
      // El usuario seleccionó un destino específico
      console.log('Destino seleccionado:', selectedValue);
    }
  }

  constructor(private serviceDestino:DestinoService){
    serviceDestino.listadoDestinos().subscribe(
      d => this.lstDestinos = d
    );
  }


}
