import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Itinerario } from 'src/app/models/itinerario.model';
import { EnvioDatosItinerarioService } from 'src/app/services/envio-datos-itinerario.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-viajes-disponibles',
  templateUrl: './add-viajes-disponibles.component.html',
  styleUrls: ['./add-viajes-disponibles.component.css']
})
export class AddViajesDisponiblesComponent implements OnInit{

  dataEntrante:any = {}

  fechaActual:string =  this.formatearFecha(new Date());


  lstOrigenes:string[]=[]
  lstLlegadas:string[]=[]
  lstItinerarios:Itinerario[]=[]


  origen:string=localStorage.getItem("origen")!
  llegada:string=localStorage.getItem("llegada")!
  fechaSalida:string=localStorage.getItem("fecha")!

  constructor(private router:Router,private itinerarioService:ItinerarioService, private servicioDatos:EnvioDatosItinerarioService){
    
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
    console.log(this.origen,this.llegada,this.fechaSalida)
    this.listarItinerarios();
  }

  llenarLlegadas(){
    this.itinerarioService.listarDestinosDiferentes(this.origen).subscribe(
      l =>{
        this.lstLlegadas = l
      }
    )
  }

  enviarData(data:any){
    //PRIMERO LIMPIAR LA MEMORIA Y SOLO DEJAR LOS DATOS PARA EL FILTRO DEL ITINERARIO
    localStorage.removeItem("lstPasajeros");
    localStorage.removeItem("asientos");
    localStorage.removeItem("lstBoletos");
    localStorage.removeItem("itinerario");
    
    //luego procede a esto
    localStorage.setItem("itinerario",JSON.stringify(data));
    this.router.navigate(["asientoselect"])

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

  formatearFecha(fechaTrabajar:Date):string{
    
    fechaTrabajar.setDate(fechaTrabajar.getDate()+1) 
    let año = fechaTrabajar.getFullYear();
    let mes = ('0' + (fechaTrabajar.getMonth() + 1)).slice(-2);  // +1 porque los meses son indexados desde 0
    let dia = ('0' + fechaTrabajar.getDate()).slice(-2);
    // Construir la cadena en el formato deseado (yyyy-MM-dd)
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
  }


  consultarItinerarios(){

    if(this.origen === "-1" || this.llegada === "-1" || this.fechaSalida === ""){
      Swal.fire({icon:'error',title:'Campos obligatorios', text:"Debe seleccionar los destinos y la fecha"})
    }
    else{
      this.listarItinerarios();
    }

    
  }


}
