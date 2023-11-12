import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Boleto } from 'src/app/models/boleto.model';
import { Itinerario } from 'src/app/models/itinerario.model';
import { Pasajero } from 'src/app/models/pasajero.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { EnvioDatosItinerarioService } from 'src/app/services/envio-datos-itinerario.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

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

  cantidadAsientos: any = []
  asientosSeleccionados: number[] = JSON.parse(localStorage.getItem("asientos")!);
  obj: Itinerario = JSON.parse(localStorage.getItem("itinerario")!);
  numeroAsientos = this.asientosSeleccionados ? this.asientosSeleccionados.length : 0
  asientos: Pasajero[] = Array.from({ length: this.numeroAsientos }, () => new Pasajero());

  boletos: Boleto[] = this.asientosSeleccionados.map(asiento => ({
    numero_asiento: asiento,
    precio: this.obj.precio
  }));

  total = JSON.parse(localStorage.getItem("asientos")!) ? this.asientosSeleccionados.length * this.obj.precio! : 0.00;


  lstDocumentos: TipoDocumento[] = []

  nombreRegex = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;
  DNIRegex = /^[0-9]{8}$/;
  ceRegex = /^[0-9]{12}$/;
  ptpRegex = /^[A-Z]{2}(?!000000)\d{6}$/;
 // if (edad === null || edad < 0 || edad > 99)

  constructor(private datosService: EnvioDatosItinerarioService, private router: Router, private utilService: UtilService,private formBuilder:FormBuilder) {
    utilService.listarTiopoDocumento().subscribe(
      x => this.lstDocumentos = x
    )
  }


  generarFormularios(numAsi: number): void {
    this.asientos = Array.from({ length: numAsi }, () => new Pasajero());
  }

  toggleItem() {
    this.isCollapsed = !this.isCollapsed;
  }

  verificar() {
      
      for(let i=0; i<this.asientos.length; i++){
        if(!this.nombreRegex.test(this.asientos[i].nombre!) || this.asientos[i].nombre === undefined
        || !this.nombreRegex.test(this.asientos[i].apellidos!) || this.asientos[i].apellidos === undefined
        || this.asientos[i].edad === undefined || this.asientos[i].edad! < 0 || this.asientos[i].edad! > 99
        || this.asientos[i].cod_tipodocumento === -1 || this.asientos[i].cod_tipodocumento === undefined
        || this.asientos[i].numeroDocumento === undefined
        ){
          Swal.fire({icon: 'error',title: 'Los datos deben ser llenados correctamente',})
          break;
        }     
        else if(this.asientos[i].cod_tipodocumento === 1 && !this.DNIRegex.test(this.asientos[i].numeroDocumento!)){
          Swal.fire({icon: 'error',title: 'Los datos deben ser llenados correctamente',})
          break;
        }
        else if(this.asientos[i].cod_tipodocumento === 2 && !this.ceRegex.test(this.asientos[i].numeroDocumento!)){
          Swal.fire({icon: 'error',title: 'Los datos deben ser llenados correctamente',})
          break;
        }
        else if(this.asientos[i].cod_tipodocumento === 3 && !this.ptpRegex.test(this.asientos[i].numeroDocumento!)){
          Swal.fire({icon: 'error',title: 'Los datos deben ser llenados correctamente',})
          break;
        }

        else{
          localStorage.setItem("lstPasajeros", JSON.stringify(this.asientos));
          localStorage.setItem("lstBoletos", JSON.stringify(this.boletos));
          for(let i=0; i<this.asientos.length; i++){
            if(this.asientos[i].edad! < 18){
              Swal.fire({icon: 'info',title: 'Recuerde que todo menor de edad debe mostrar el permiso para viajar',})
              break;
            }
          }
          this.router.navigate(["ventacliente"]);
        }     
      }

  }

  validarDocumento(i: number) {
    const documento = this.asientos[i].numeroDocumento;

    if (!documento) {
      return '* Campo Obligatorio';
    }

    const dniRegex = /^[0-9]{8}$/;

    if (!dniRegex.test(documento)) {
      return '* Dni incorrecto';
    }


    return null;
  }


  validarCEX(i: number) {
    const documento = this.asientos[i].numeroDocumento;

    if (!documento) {
      return '* Campo Obligatorio';
    }


    const ceRegex = /^[0-9]{12}$/;

    if (!ceRegex.test(documento)) {
      return '* C.E. incorrecto';
    }


    return null;
  }

  validarPTP(i: number) {
    const documento = this.asientos[i].numeroDocumento;

    if (!documento) {
      return '* Campo Obligatorio';
    }


    const ptpRegex = /^[A-Z]{2}(?!000000)\d{6}$/;

    if (!ptpRegex.test(documento)) {
      return '* P.T.P incorrecto';
    }

    return null;
  }
  validarnombre(i: number) {
    const documento = this.asientos[i].nombre;

    if (!documento) {
      return '* Campo Obligatorio';
    }


    const ptpRegex = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;

    if (!ptpRegex.test(documento)) {
      return '*Entre 3 y 30 caracteres Alfabeticos';
    }

    return null;
  }

  validarApellidos(i: number) {
    const documento = this.asientos[i].apellidos;

    if (!documento) {
      return '* Campo Obligatorio';
    }


    const ptpRegex = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;

    if (!ptpRegex.test(documento)) {
      return '*Entre 3 y 30 caracteres Alfabeticos';
    }

    return null;
  }

  mensajeErrorEdad: string = '';

  edadValido(edad: number) {
    if (edad === null || edad < 0 || edad > 99) {
      this.mensajeErrorEdad = 'La edad debe estar entre 0 y 99.';
      return true;
    }
    this.mensajeErrorEdad = 'Campo Obligatorio';
    return false;
  }

}
