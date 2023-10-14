import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Boleto } from 'src/app/models/boleto.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { Pasajero } from 'src/app/models/pasajero.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { EnvioDatosItinerarioService } from 'src/app/services/envio-datos-itinerario.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-venta-pasajero',
  templateUrl: './add-venta-pasajero.component.html',
  styleUrls: ['./add-venta-pasajero.component.css']
})
export class AddVentaPasajeroComponent {

  isCollapsed = false;
 // pasajeros = [{ nombre: '', edad: '' }];
 // fontStyleControl = new FormControl('');
 // fontStyle?: string;

  cantidadAsientos:any=[]
  asientosSeleccionados:number[] = JSON.parse(localStorage.getItem("asientos")!);
  obj:Itinerario = JSON.parse(localStorage.getItem("itinerario")!);
  numeroAsientos = this.asientosSeleccionados ? this.asientosSeleccionados.length:0
  asientos:Pasajero[] = Array.from({ length: this.numeroAsientos }, () => new Pasajero());

  boletos:Boleto[] = this.asientosSeleccionados.map(asiento => ({
    numero_asiento:asiento,
    precio:this.obj.precio
  }));

  total=JSON.parse(localStorage.getItem("asientos")!)?this.asientosSeleccionados.length*this.obj.precio!:0.00;


  lstDocumentos:TipoDocumento[] = []

  constructor(private datosService:EnvioDatosItinerarioService,private router:Router, private utilService:UtilService){
      utilService.listarTiopoDocumento().subscribe(
        x => this.lstDocumentos = x
      )
  }


  generarFormularios(numAsi:number): void {
    this.asientos = Array.from({ length: numAsi }, () => new Pasajero());
  }

  toggleItem() {
    this.isCollapsed = !this.isCollapsed;
  }

  verificar(){
    localStorage.setItem("lstPasajeros",JSON.stringify(this.asientos));
    localStorage.setItem("lstBoletos",JSON.stringify(this.boletos));
    this.router.navigate(["ventacliente"]);
  }


}
