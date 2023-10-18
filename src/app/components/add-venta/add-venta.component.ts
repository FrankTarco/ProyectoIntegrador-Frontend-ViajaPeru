import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Destino } from 'src/app/models/destino.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { DestinoService } from 'src/app/services/destino.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.css']
})
export class AddVentaComponent {

  fechaActual:string = this.formatearFecha2(new Date());

  lstOrigenes:string[] = []
  lstLlegadas:string[] = []
  lstItinerarios:Itinerario[] = []

  origen:string="-1"
  llegada:string="-1"
  fecha:string=""


  constructor(private itinerarioService:ItinerarioService,private router:Router){
    itinerarioService.listarDestinos().subscribe(
      x =>{
        this.lstOrigenes = x
      }
    )
  }

  llenarLlegadas(){
    this.itinerarioService.listarDestinosDiferentes(this.origen).subscribe(
      l =>{
        this.lstLlegadas = l
      }
    )
  }

  buscarItinerario(){
    if(this.origen === "-1" || this.llegada === "-1" || this.fecha === ""){
      Swal.fire({icon:'error',title:'Campos obligatorios', text:"Debe seleccionar los destinos y la fecha"})
    }
    else{
      localStorage.setItem("origen",this.origen)
      localStorage.setItem("llegada",this.llegada)
      localStorage.setItem("fecha",this.formatearFecha(this.fecha))
      this.router.navigate(["viajes"])
    }  
  }



  formatearFecha(fechaTrabajar:string):string{
    let formaNueva = new Date(fechaTrabajar);
    formaNueva.setDate(formaNueva.getDate()+1) 
    let año = formaNueva.getFullYear();
    let mes = ('0' + (formaNueva.getMonth() + 1)).slice(-2);  // +1 porque los meses son indexados desde 0
    let dia = ('0' + formaNueva.getDate()).slice(-2);
    // Construir la cadena en el formato deseado (yyyy-MM-dd)
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
  }

  formatearFecha2(fechaTrabajar:Date):string{
    fechaTrabajar.setDate(fechaTrabajar.getDate()+1) 
    let año = fechaTrabajar.getFullYear();
    let mes = ('0' + (fechaTrabajar.getMonth() + 1)).slice(-2);  // +1 porque los meses son indexados desde 0
    let dia = ('0' + fechaTrabajar.getDate()).slice(-2);
    // Construir la cadena en el formato deseado (yyyy-MM-dd)
    let fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada
  }


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

  


}
