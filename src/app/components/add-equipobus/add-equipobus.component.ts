import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ListChoferComponent } from 'src/app/dialogs/list-chofer/list-chofer.component';
import { ListCopilotoComponent } from 'src/app/dialogs/list-copiloto/list-copiloto.component';
import { ListTerramozaComponent } from 'src/app/dialogs/list-terramoza/list-terramoza.component';
import { Conductor } from 'src/app/models/conductor.model';
import { Equipobus } from 'src/app/models/equipobus.model';
import { Terramoza } from 'src/app/models/terramoza.model';
import { EquipobusService } from 'src/app/services/equipobus.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-equipobus',
  templateUrl: './add-equipobus.component.html',
  styleUrls: ['./add-equipobus.component.css']
})
export class AddEquipobusComponent {


  objChofer:Conductor={
    nom_chofer:"",
    nrodocumento:"",
    objLicencia:{
      descripcion:""
    }
  }

  objCopiloto:Conductor={
    nom_chofer:"",
    nrodocumento:"",
    objLicencia:{
      descripcion:""
    }
  }

  objTerramoza:Terramoza={

    nombre:"",
    numerodocumento:""
  }

  objEquipo:Equipobus={
    codchofer:"",
    codcopiloto:"",
    codterramoza:"",
    estado:1
  }


  constructor(private equipoService:EquipobusService,private dialog:MatDialog){
    
  }

  openDialog(){

    const dialog = this.dialog.open(ListChoferComponent)
    dialog.afterClosed().subscribe(
      res =>{
        this.objChofer={
          nom_chofer:res.nom_chofer +' '+ res.ape_chofer,
          nrodocumento:res.nrodocumento,
          objLicencia:{
            descripcion:res.objLicencia.descripcion
          }
        }
        this.objEquipo.codchofer=res.cod_conductor;
      }
    );
  } 

  openCopilotos(data:string){
    if(this.objEquipo.codchofer==""){
      Swal.fire({icon:'error',title:'Resultado del registro', text: "Debe escoger primero al chofer"})
    }
    else{
      const dialogCopilotos = this.dialog.open(ListCopilotoComponent, {data,})
      dialogCopilotos.afterClosed().subscribe(
        res =>{
          this.objCopiloto={
            nom_chofer:res.nom_chofer +' '+ res.ape_chofer,
            nrodocumento:res.nrodocumento,
            objLicencia:{
              descripcion:res.objLicencia.descripcion
            }
          }
          this.objEquipo.codcopiloto=res.cod_conductor;
        }
      )
    }
  }

  openTerramozas(){
    const dialogTerramozas = this.dialog.open(ListTerramozaComponent)
    dialogTerramozas.afterClosed().subscribe(
      res =>{
        this.objTerramoza={
          cod_terramoza:res.cod_terramoza,
          nombre:res.nombre +' '+ res.ape_pater + res.ape_mater,
          numerodocumento:res.numerodocumento,
        }
        this.objEquipo.codterramoza=res.cod_terramoza;
      }
    );
  }

  registrar(){
    this.equipoService.registrarEquipoBus(this.objEquipo).subscribe(
      res => {
        Swal.fire({icon:'info',title:'Resultado del registro', text: res.mensaje})
      }
    )
  }

  
}
