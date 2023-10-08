import { Component, ViewChild,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Bus } from 'src/app/models/bus.model';
import { Destino } from 'src/app/models/destino.model';
import { Equipobus } from 'src/app/models/equipobus.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { BusService } from 'src/app/services/bus.service';
import { DestinoService } from 'src/app/services/destino.service';
import { EquipobusService } from 'src/app/services/equipobus.service';
import { ItinerarioService } from 'src/app/services/itinerario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-itinerario',
  templateUrl: './add-edit-itinerario.component.html',
  styleUrls: ['./add-edit-itinerario.component.css']
})
export class AddEditItinerarioComponent {

  @ViewChild(MatExpansionPanel) panel: MatExpansionPanel | undefined;

  lstEquipos:Equipobus[] = []
  lstOrigen:Destino[]=[]
  lstDestinos:Destino[]=[]
  lstBuses:Bus[] = []


objItinerario:Itinerario={
  cod_itinerario:"",
  fecha_salida:"",
  fecha_llegada:"",
  codorigen:"-1",
  codllegada:"-1",
  codequipo:"",
  codbus:"",
  precio:0.0,
  estado:1
}

  constructor(private equipoBus:EquipobusService,private destinoService:DestinoService,
    private busService:BusService,private itinerarioService:ItinerarioService,
    private _dialog:MatDialogRef<AddEditItinerarioComponent>,
    @Inject(MAT_DIALOG_DATA)public data:any){

    equipoBus.listarEquipos().subscribe(
      x => this.lstEquipos = x
    )

    destinoService.listadoDestinos().subscribe(
      d => this.lstOrigen = d
    )

    busService.listarBuses().subscribe(
      b => this.lstBuses = b
    )

  }

  ngOnInit(): void {

    if(this.data){
      this.llenarDestinos();
      this.objItinerario= {
        cod_itinerario:this.data.cod_itinerario,
        fecha_salida:this.data.fecha_salida,
        fecha_llegada:this.data.fecha_llegada,
        codorigen:this.data.codorigen,
        codllegada:this.data.codllegada,
        codequipo:this.data.codequipo,
        codbus:this.data.codbus,
        precio:this.data.precio,
        estado:this.data.estado
      }
    }  
  }

  llenarDestinos(){
    const selectedText = this.lstOrigen.find(origin => origin.cod_destino === this.objItinerario.codorigen)?.nombre;
    console.log(selectedText)
    this.destinoService.listadoDestinosDiferente(selectedText!).subscribe(
      x =>{
        this.lstDestinos = x 
      }
    )
    this.objItinerario.codllegada="-1"
  }

  teamSelect(codigo:string){
    this.objItinerario.codequipo=codigo
    this.panel?.close();
  }

  registrar(){

    if(this.data){
      this.itinerarioService.actualizarItinerario(this.objItinerario).subscribe(
        x =>{
          Swal.fire({icon:'info',title:'Resultado de la actualizacion', text: x.mensaje})
          this._dialog.close(true)
        }
      )
          
    }else{
      this.itinerarioService.registrarItinerario(this.objItinerario).subscribe(
        x => {
          Swal.fire({icon:'info',title:'Resultado del registro', text: x.mensaje})
          this._dialog.close(true)
        }
      )
    }
    
  }


}
