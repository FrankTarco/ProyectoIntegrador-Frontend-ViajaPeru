import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { Itinerario } from 'src/app/models/itinerario.model';
import { EnvioDatosItinerarioService } from 'src/app/services/envio-datos-itinerario.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';

@Component({
  selector: 'app-add-seleccion-asientos',
  templateUrl: './add-seleccion-asientos.component.html',
  styleUrls: ['./add-seleccion-asientos.component.css']
})
export class AddSeleccionAsientosComponent{
 
  asientosSeleccionados:number[] = []
  asientosOcupados:number[] = [1,5,7,8,10,30] //traer esta data de la bd
  cod_itinerario:string = localStorage.getItem("itinerario")!
  obj:Itinerario={}
  arrayAsientos:number[]=[]
  total=0.00;

  constructor(private itinerarioService:ItinerarioService){
    itinerarioService.itinerarioPorCodigo(this.cod_itinerario).subscribe(x => {
      this.obj = x
      this.arrayAsientos = Array(x.objBus?.total_pasajeros!).fill(0).map((x,i )=> i + 1);
    })
  }

  


  seleccionarAsiento(asiento:number){
    const indice = this.asientosSeleccionados.indexOf(asiento);
    if(indice === -1){
      this.asientosSeleccionados.push(asiento);
      this.total+=70;
      
    }
    else{
      this.asientosSeleccionados.splice(indice,1)
      this.total-=70;
    }
  }

}
