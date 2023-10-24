import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Bus } from 'src/app/models/bus.model';
import { Terramoza } from 'src/app/models/terramoza.model';
import { TipoDocumento } from 'src/app/models/tipodocumento.model';
import { TerramozaService } from 'src/app/services/terramoza.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-terramoza',
  templateUrl: './add-edit-terramoza.component.html',
  styleUrls: ['./add-edit-terramoza.component.css']
})
export class AddEditTerramozaComponent implements OnInit {

  lstTipoDocumento: TipoDocumento[] = []

  estado = 'form';
  dniPatt = /^(?!0{8}$)\d{8}$/;
  cePatt = /^(?!0{12}$)\d{12}$/;
  ptpPatt = /^[A-Za-z0-9]{6,12}$/;
  rucPatt = /^(?!0{11}$)\d{11}$/;

  nombrePatt = /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ\s]{3,30}$/;
  objTerramoza: Terramoza = {
    cod_terramoza: "",
    nombre: "",
    ape_mater: "",
    ape_pater: "",
    cod_tipodocumento: -1,
    numerodocumento: "",
  }

  constructor(private terramozaService: TerramozaService, private utilService: UtilService,
    public _dialogRef: MatDialogRef<AddEditTerramozaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    utilService.listarTiopoDocumento().subscribe(
      x => this.lstTipoDocumento = x
    )

  }


  ngOnInit(): void {
    if (this.data) {
      this.objTerramoza = {
        cod_terramoza: this.data.cod_terramoza,
        nombre: this.data.nombre,
        ape_pater: this.data.ape_pater,
        ape_mater: this.data.ape_mater,
        cod_tipodocumento: this.data.cod_tipodocumento,
        numerodocumento: this.data.numerodocumento
      }
    }
  }

  registrar() {

    if (this.validarCampos() == false && this.estado == 'form') {
      Swal.fire({
        icon: 'error',
        title: 'Ingrese Datos',
        text: "Todos los campos son obligatorios para el Registro",
      })


    } else if (this.objTerramoza.cod_tipodocumento! == -1) {
      Swal.fire({ icon: 'info', title: 'Seleccione el tipo de documento' })

    } else if (this.objTerramoza.cod_tipodocumento! == 1 && !this.dniPatt.test(this.objTerramoza.numerodocumento!)) {
      Swal.fire({ icon: 'info', title: 'Error en el número de DNI' })


    } else if (this.objTerramoza.cod_tipodocumento! == 2 && !this.cePatt.test(this.objTerramoza.numerodocumento!)) {
      Swal.fire({ icon: 'info', title: 'Error en el número de Carnet de Extranejria' })

    } else if (this.objTerramoza.cod_tipodocumento! == 3 && !this.ptpPatt.test(this.objTerramoza.numerodocumento!)) {
      Swal.fire({ icon: 'info', title: 'Error en el número de Pasaporte' })

    } else if (this.validarCampos() == false && this.estado == 'nombre') {
      Swal.fire({
        icon: 'error',
        title: 'Verificar El nombre Ingresado',
        text: "Solo Caracteres Alfabeticos",
      })

    } else if (this.validarCampos() == false && this.estado == 'paterno') {
      Swal.fire({
        icon: 'error',
        title: 'Verificar El apellido Paterno Ingresado',
        text: "Solo Caracteres Alfabeticos",
      })

    } else if (this.validarCampos() == false && this.estado == 'materno') {
      Swal.fire({
        icon: 'error',
        title: 'Verificar El apellido Materno Ingresado',
        text: "Solo Caracteres Alfabeticos",
      })

    } else if (this.validarCampos() == true) {

      if (this.data) {
        this.terramozaService.actualizarTerramoza(this.objTerramoza).subscribe(
          x => {
            Swal.fire({ icon: 'info', title: 'Resultado de la actualizacion', text: x.mensaje })
            this._dialogRef.close(true)
          }
        )
      }
      else {

        this.terramozaService.registrarTerramoza(this.objTerramoza).subscribe(
          x => {
            Swal.fire({ icon: 'info', title: 'Resultado del registro', text: x.mensaje })
            this._dialogRef.close(true)

          });
      }
    }
  }


  validarCampos(): boolean {
    if (


      !this.objTerramoza.ape_pater ||
      !this.objTerramoza.ape_mater ||
      !this.objTerramoza.nombre

    ) {


      return false;
    }

    if (!this.nombrePatt.test(this.objTerramoza.nombre)) {
      this.estado = 'nombre';
      return false;
    } else if (!this.nombrePatt.test(this.objTerramoza.ape_pater)) {
      this.estado = 'paterno';
      return false;
    } else if (!this.nombrePatt.test(this.objTerramoza.ape_mater)) {
      this.estado = 'materno';
      return false;
    }

    return true;
  }

}
