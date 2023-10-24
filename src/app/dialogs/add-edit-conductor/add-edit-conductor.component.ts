import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Conductor } from 'src/app/models/conductor.model';
import { Licencia } from 'src/app/models/licencia.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';

import { ConductorService } from 'src/app/services/conductor.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-edit-conductor',
  templateUrl: './add-edit-conductor.component.html',
  styleUrls: ['./add-edit-conductor.component.css']
})
export class AddEditConductorComponent implements OnInit {
  nombrePatt = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;

  estado = 'form';
  dniPatt = /^(?!0{8}$)\d{8}$/;
  cePatt = /^(?!0{12}$)\d{12}$/;
  ptpPatt = /^[A-Za-z0-9]{6,12}$/;
  rucPatt = /^(?!0{11}$)\d{11}$/;
  licPatt = /^[A-Z]-[0-9]{8,12}$/;
  celPatt = /^9[0-9]{8}$/;

  lstTipo: TipoDocumento[] = []
  lstLicencia: Licencia[] = []

  objConductor: Conductor = {

    cod_conductor: "",
    cod_tipodocumento: -1,
    nrodocumento: "",
    ape_chofer: "",
    nom_chofer: "",
    cod_licencia: -1,
    nrolicencia: "",
    telefono: ""
  };



  constructor(private util: UtilService, private conductorsev: ConductorService,
    private _dialog: MatDialogRef<AddEditConductorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    util.listarTiopoDocumento().subscribe(

      a => this.lstTipo = a
    )

    util.listarLicencia().subscribe(

      l => this.lstLicencia = l
    )

  }

  ngOnInit(): void {
    if (this.data) {
      this.objConductor = {
        cod_conductor: this.data.cod_conductor,
        cod_tipodocumento: this.data.cod_tipodocumento,
        nrodocumento: this.data.nrodocumento,
        ape_chofer: this.data.ape_chofer,
        nom_chofer: this.data.nom_chofer,
        cod_licencia: this.data.cod_licencia,
        nrolicencia: this.data.nrolicencia,
        telefono: this.data.telefono
      }
    }
  }


  agregarGuion() {
    this.objConductor.nrolicencia = this.objConductor.nrolicencia?.replace(/-/g, '');

    if (this.objConductor.nrolicencia?.length! >= 1) {
      this.objConductor.nrolicencia = this.objConductor.nrolicencia?.slice(0, 1) + '-' + this.objConductor.nrolicencia?.slice(1)
    }
  }

  insertaConductor() {

    if (this.objConductor.cod_tipodocumento! == -1) {
      Swal.fire({ icon: 'info', title: 'Seleccione el tipo de documento' })


    } else if (this.objConductor.cod_licencia! == -1) {
      Swal.fire({ icon: 'info', title: 'Seleccione el tipo de Licencia' })


    } else if (this.validarCampos() == false && this.estado == 'form') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      });


    } else if (this.validarCampos() == false && this.estado == 'dni') {
      Swal.fire({
        icon: 'info',
        title: 'DNI ingresado es incorrecto',
        text: "El DNI debe tener 8 digitos numericos",
      })


    } else if (this.validarCampos() == false && this.estado == 'ce') {
      Swal.fire({
        icon: 'info',
        title: 'Carnet de Extranjeria ingresado es incorrecto.',
        text: "El C.E. debe tener 12 digitos numericos",
      })


    } else if (this.validarCampos() == false && this.estado == 'ptp') {
      Swal.fire({
        icon: 'info',
        title: 'Pasaporte ingresado es incorrecto.',
        text: "El P.T.P. debe contar con 6 a 12 caracteres alfa-numericos",
      })


    } else if (this.validarCampos() == false && this.estado == 'ape') {
      Swal.fire({
        icon: 'info',
        title: 'Apellidos ingresados incorrectos',
        text: "Los Apellidos solo deben contener caracteres Alfabeticos",
      })


    } else if (this.validarCampos() == false && this.estado == 'nom') {
      Swal.fire({
        icon: 'info',
        title: 'Nombres ingresados incorrectos',
        text: "Los nombres solo deben contener caracteres Alfabeticos",
      })


    } else if (this.validarCampos() == false && this.estado == 'lic') {
      Swal.fire({
        icon: 'info',
        title: 'Licencia es incorrecta',
        text: "Debe comenzar con una letra mayúscula seguida de un guión y luego contener entre 8 y 12 dígitos numéricos.",
      })


    } else if (this.validarCampos() == false && this.estado == 'cel') {
      Swal.fire({
        icon: 'info',
        title: 'Telefono celular ingresado incorrecto',
        text: "Debe comenzar con 9 y tener exactamente 9 dígitos en total.",
      })


    } else if (this.validarCampos() == true) {


      if (this.data) {
        this.conductorsev.actualizarConductor(this.objConductor).subscribe(
          c => {
            Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: c.mensaje })
            this._dialog.close(true)
          }
        )
      }

      else {
        this.conductorsev.registraConductor(this.objConductor).subscribe(
          c => {
            if (c.mensaje.indexOf('Error') !== -1) {
              Swal.fire({ icon: 'error', title: 'Algo salio mal', text: c.mensaje })
              this._dialog.close(true)
            }
            else {
              Swal.fire({ icon: 'success', title: 'Registro de conductor exitoso', text: c.mensaje })
              this._dialog.close(true)
            }
          });
      }
    }
  }

  validarCampos(): boolean {
    if (
      !this.objConductor.nrodocumento ||
      !this.objConductor.ape_chofer ||
      !this.objConductor.nom_chofer ||
      !this.objConductor.nrolicencia ||
      !this.objConductor.telefono

    ) {
      return false;
    }
    if (this.objConductor.cod_tipodocumento===1 && !this.dniPatt.test(this.objConductor.nrodocumento)) {
      this.estado = 'dni';
      return false;
    } else if (this.objConductor.cod_tipodocumento===2 && !this.cePatt.test(this.objConductor.nrodocumento)) {
      this.estado = 'ce';
      return false;
    } else if (this.objConductor.cod_tipodocumento===3 && !this.ptpPatt.test(this.objConductor.nrodocumento)) {
      this.estado = 'ptp';
      return false;
    } else if (!this.nombrePatt.test(this.objConductor.ape_chofer)) {
      this.estado = 'ape';
      return false;
    } else if (!this.nombrePatt.test(this.objConductor.nom_chofer)) {
      this.estado = 'nom';
      return false;
    } else if (!this.licPatt.test(this.objConductor.nrolicencia)) {
      this.estado = 'lic';
      return false;
    } else if (!this.celPatt.test(this.objConductor.telefono)) {
      this.estado = 'cel';
      return false;
    }

    return true;
  }

}
