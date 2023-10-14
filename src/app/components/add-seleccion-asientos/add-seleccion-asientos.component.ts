import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario.model';
import { EnvioDatosItinerarioService } from 'src/app/services/envio-datos-itinerario.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-seleccion-asientos',
  templateUrl: './add-seleccion-asientos.component.html',
  styleUrls: ['./add-seleccion-asientos.component.css']
})
export class AddSeleccionAsientosComponent{
 

  asientosSeleccionados:number[] = JSON.parse(localStorage.getItem("asientos")!)?JSON.parse(localStorage.getItem("asientos")!):[];


  asientosOcupados:number[] = [] //traer esta data de la bd



  obj:Itinerario=JSON.parse(localStorage.getItem("itinerario")!);
  arrayAsientos:number[]=Array(this.obj.objBus!.total_pasajeros).fill(0).map((x,i )=> i + 1);
  total=JSON.parse(localStorage.getItem("asientos")!)?this.asientosSeleccionados.length*this.obj.precio!:0.00;

  constructor(private itinerarioService:ItinerarioService,private router:Router,
    private servicioDatos:EnvioDatosItinerarioService, private utilService:UtilService){

      console.log("Enviando codigo ", this.obj.cod_itinerario!)
      utilService.listarBoletosVendidos(this.obj.cod_itinerario!).subscribe(
        x => {
          this.asientosOcupados = x
        }       
      )
  }

  


  seleccionarAsiento(asiento:number){
    const indice = this.asientosSeleccionados.indexOf(asiento);
    if(indice === -1){
      this.asientosSeleccionados.push(asiento);
      this.total+=this.obj.precio!;
      
    }
    else{
      this.asientosSeleccionados.splice(indice,1)
      this.total-=this.obj.precio!;
    }
  }

  enviarAsientosSeleccionados(){
    console.log("Enviando",this.asientosSeleccionados)
    console.log("VerificarOcupados",this.asientosOcupados)
    localStorage.setItem("asientos",JSON.stringify(this.asientosSeleccionados));
    this.router.navigate(["pasajeros"]);
  }

}
