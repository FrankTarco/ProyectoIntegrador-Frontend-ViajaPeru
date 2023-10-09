import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario.model';
import { ItinerarioService } from 'src/app/services/itinerario.service';

@Component({
  selector: 'app-add-viajes-disponibles',
  templateUrl: './add-viajes-disponibles.component.html',
  styleUrls: ['./add-viajes-disponibles.component.css']
})
export class AddViajesDisponiblesComponent implements OnInit{


  lstOrigenes:string[]=[]
  lstLlegadas:string[]=[]
  lstItinerarios:Itinerario[]=[]


  origen:string=localStorage.getItem("origen")!
  llegada:string=localStorage.getItem("llegada")!
  fechaSalida:string=localStorage.getItem("fecha")!

  constructor(private router:Router,private itinerarioService:ItinerarioService){

    itinerarioService.listarDestinos().subscribe(
      x=>{
        this.lstOrigenes = x
      }
    )

    itinerarioService.listarDestinosDiferentes(this.origen).subscribe(
      x =>{
        this.lstLlegadas = x
      }
    
    )
      
  }


  ngOnInit(): void {
    this.listarItinerarios();
  }

  listarItinerarios(){
    this.itinerarioService.listarItinerariosCliente(this.origen,this.llegada,this.minorarFecha(this.fechaSalida)).subscribe(
      x=>{
        this.lstItinerarios = x
      }
    )
  }

  minorarFecha(fechaTrabajar:string):string{
    let formaNueva = new Date(fechaTrabajar);
    let año = formaNueva.getFullYear();
    let mes = ('0' + (formaNueva.getMonth() + 1)).slice(-2);  // +1 porque los meses son indexados desde 0
    let dia = ('0' + formaNueva.getDate()).slice(-2);
    // Construir la cadena en el formato deseado (yyyy-MM-dd)
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
  }


}
