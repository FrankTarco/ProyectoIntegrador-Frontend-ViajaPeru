import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { Combustible } from 'src/app/models/combustible.model';
import { Servicio } from 'src/app/models/servicio.model';
import { BusService } from 'src/app/services/bus.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-bus',
  templateUrl: './add-edit-bus.component.html',
  styleUrls: ['./add-edit-bus.component.css']
})
export class AddEditBusComponent implements OnInit {

  estado = 'form';
  letraspatt = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{2,20}$/;
  codigoPattern = /^[A-Z0-9Ñ]{3}-[A-Z0-9Ñ]{3}$/;
  lstCombustible: Combustible[] = []
  lstServicio: Servicio[] = []


  objBus: Bus = {
    cod_bus: '',
    placa: '',
    marca: '',
    total_asientos:50 ,
    total_pasajeros: 50,
    fabricacion: 2011,
    cantidad_ruedas: 4,
    cod_combustible: -1,
    cod_servicio: -1,
    estado: 1
  }

  constructor(private utilService: UtilService, private busService: BusService,
    private _dialog: MatDialogRef<AddEditBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    utilService.listarCombustibles().subscribe(
      c => this.lstCombustible = c
    )

    utilService.listarServicios().subscribe(
      s => this.lstServicio = s
    )

  }

  ngOnInit(): void {

    if (this.data) {
      this.objBus = {
        cod_bus: this.data.cod_bus,
        placa: this.data.placa,
        marca: this.data.marca,
        total_asientos: this.data.total_asientos,
        total_pasajeros: this.data.total_pasajeros,
        fabricacion: this.data.fabricacion,
        cantidad_ruedas: this.data.cantidad_ruedas,
        cod_combustible: this.data.cod_combustible,
        cod_servicio: this.data.cod_servicio,
        estado: this.data.estado
      }
    }
  }

  agregarGuion() {
    this.objBus.placa = this.objBus.placa?.replace(/-/g, '');

    if (this.objBus.placa?.length! >= 3) {
      this.objBus.placa = this.objBus.placa?.slice(0, 3) + '-' + this.objBus.placa?.slice(3)
    }
  }

  validarCampos(): boolean {
    const añoActual = new Date().getFullYear();
    //console.log(añoActual);

    if (
      !this.objBus.placa ||
      !this.objBus.marca ||
      this.objBus.total_asientos == 0 ||
      this.objBus.total_pasajeros == 0 ||
      this.objBus.fabricacion == 0 ||
      this.objBus.cantidad_ruedas == 0 ||
      this.objBus.estado === -1
    ) {


      return false;
    }


    if (!this.codigoPattern.test(this.objBus.placa)) {

      this.estado = 'placa';
      console.log(this.estado);
      return false;
    } else if (!this.letraspatt.test(this.objBus.marca)) {
      this.estado = 'marca';
      return false;
    } else if (this.objBus.total_asientos! < 50 || this.objBus.total_asientos! > 100) {
      this.estado = 'asiento';

      return false;
    } else if (this.objBus.total_pasajeros! > this.objBus.total_asientos!) {
      this.estado = 'maspasajero';

      return false;
    } else if (this.objBus.total_pasajeros! < 50 || this.objBus.total_pasajeros! > 100) {
      this.estado = 'intervalopasajeros';

      return false;
    } else if (this.objBus.fabricacion! < 2010 || this.objBus.fabricacion! > añoActual) {
      this.estado = 'fabricacion';

      return false;
    } else if (this.objBus.cantidad_ruedas! % 2 !== 0) {
      this.estado = 'impar';

      return false;
    } else if (this.objBus.cantidad_ruedas! < 4 || this.objBus.cantidad_ruedas! > 16) {
      this.estado = 'ruedas';
      return false;
    }
    this.estado = 'form'
    return true;

  }






  registrar() {
    

    if (this.validarCampos() == false && this.estado == 'form') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      })


    } else if (this.validarCampos() == false && this.estado == 'placa') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Placa Correcta',
        text: "Ejmeplo de placa correcta : ABC-123",
      })

    } else if (this.validarCampos() == false && this.estado == 'marca') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Marca Correcta',
        text: "Para el campo marca solo caracteres alfabeticos",
      })

    } else if (this.validarCampos() == false && this.estado == 'asiento') {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad de Asientos Incorrecta',
        text: "El intervalo permitido es de 50 a 100 asientos por bus",
      })

    } else if (this.validarCampos() == false && this.estado == 'maspasajero') {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad de Pasajeros superior a los asientos',
        text: "La cantidad de pasajeros no debe ser mayor a la capacidad del Bus",
      })

    } else if (this.validarCampos() == false && this.estado == 'intervalopasajeros') {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad de Pasajeros correcta',
        text: "El intervalo permitido es de 50 a 100 pasajeros por bus",
      })

    } else if (this.validarCampos() == false && this.estado == 'fabricacion') {
      Swal.fire({
        icon: 'error',
        title: 'Año de Frabricacion Incorrecta',
        text: "El año de fabricacion no debe ser menor a 2010 o mayor a 2023",
      })

    } else if (this.validarCampos() == false && this.estado == 'impar') {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad de Ruedas Incorrecta',
        text: "La cantidad de ruedas no debe ser un numero impar",
      })

    } else if (this.validarCampos() == false && this.estado == 'ruedas') {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad de Ruedas Incorrecta',
        text: "La cantidad debe ser mayor a 4 y menor a 16",
      })

    } else if (this.objBus.cod_combustible! == -1) {

      Swal.fire({ icon: 'info', title: 'Seleccione el tipo de Combustible' })
      this.objBus.cod_combustible = -1;


    } else if (this.objBus.cod_servicio! == -1) {
      Swal.fire({ icon: 'info', title: 'Seleccione el tipo de Servicio' })
      this.objBus.cod_servicio = -1;

    }



    else if (this.validarCampos() == true) {


      if (this.data) {
        this.busService.actualizarBus(this.objBus).subscribe(
          x => {
            Swal.fire({ icon: 'info', title: 'Resultado de la actualizacion', text: x.mensaje })
            this._dialog.close(true)
          }
        )

      } else {
        this.busService.registrarBus(this.objBus).subscribe(
          x => {
            Swal.fire({ icon: 'info', title: 'Resultado del registro', text: x.mensaje })
            this._dialog.close(true)

          }
        )
      }
    }


  }




}