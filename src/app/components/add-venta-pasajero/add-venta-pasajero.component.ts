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
  dnival = /^(?!0{8}$)\d{8}$/;
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

  constructor(private datosService: EnvioDatosItinerarioService,private formBuilder:FormBuilder, private router: Router, private utilService: UtilService) {
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
      


      localStorage.setItem("lstPasajeros", JSON.stringify(this.asientos));
      localStorage.setItem("lstBoletos", JSON.stringify(this.boletos));
      this.router.navigate(["ventacliente"]);

    
  }

  formRegistra = this.formBuilder.group({
    validaTipo:['', [Validators.min(1)]],
    ValidaDNI:['', [Validators.required,Validators.pattern(this.dnival)]],
    ValidaNombres:['', [Validators.required,Validators.pattern('[A-Za-z0-9 ,áéíóúüñÁÉÍÓÚÑÜ]{3,150}')]],
    ValidaApellidos:['', [Validators.required,Validators.pattern('[A-Za-z0-9 ,áéíóúüñÁÉÍÓÚÑÜ]{3,150}')]],
    ValidaEdad:['',Validators.required,Validators.min(0)]
  })



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


    const ptpRegex = /^[A-Za-z0-9]{6,12}$/;

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
    if (edad === null || edad <= 0 || edad > 99) {
      this.mensajeErrorEdad = 'La edad debe estar entre 0 y 99.';
      return true;
    }
    this.mensajeErrorEdad = 'Campo Obligatorio';
    return false;
  }

}
